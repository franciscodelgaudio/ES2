import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) { return null; }
  if (password?.value !== confirmPassword?.value) { return { passwordMismatch: true }; }
  return null;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration implements OnInit {

  registrationForm!: FormGroup;
  
  currentStep = signal(1); 

  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]), 
      phoneParticipant: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      roleParticipant: new FormControl(null, Validators.required),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    }, { validators: passwordMatchValidator }); 
  }

  nextStep(): void {
    const step1Controls = ['name', 'email', 'password', 'confirmPassword', 'phoneParticipant', 'roleParticipant'];
    let isStep1Valid = true;

    step1Controls.forEach(controlName => {
      const control = this.registrationForm.get(controlName);
      control?.markAsTouched(); 
      control?.updateValueAndValidity();
      if (control?.invalid) {
        isStep1Valid = false;
      }
    });

    if (isStep1Valid && !this.registrationForm.hasError('passwordMismatch')) {
      this.currentStep.set(2);
    }
  }

  prevStep(): void {
    this.currentStep.set(1);
  }

  onCepBlur(): void {
    const cep = this.registrationForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.apiService.getAddressByCep(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            alert('CEP não encontrado.'); return;
          }
          this.registrationForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade, 
            estado: data.uf
          });
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
          alert('Não foi possível consultar o CEP.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      const fullAddress = `${formValue.logradouro}, ${formValue.numero} - ${formValue.bairro}, ${formValue.cidade} - ${formValue.estado}, CEP: ${formValue.cep}`;
      const dataToSend = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        phoneParticipant: formValue.phoneParticipant,
        roleParticipant: formValue.roleParticipant,
        address: fullAddress 
      };
      this.apiService.registerParticipant(dataToSend).subscribe({
        next: (response) => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error?.message?.includes('E-mail já cadastrado')) {
            alert('Este email já está em uso.');
          } else {
            alert('Ocorreu um erro durante o cadastro.');
          }
        }
      });
    } else {
      // Força a exibição de todos os erros caso o formulário seja inválido
      this.registrationForm.markAllAsTouched();
    }
  }
}