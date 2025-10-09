import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }

  if (password?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration implements OnInit {

  registrationForm!: FormGroup;

  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required), 
      address: new FormControl('', Validators.required),
      phoneParticipant: new FormControl('', Validators.required),
      roleParticipant: new FormControl(null, Validators.required)
    }, { validators: passwordMatchValidator }); 
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { confirmPassword, ...formData } = this.registrationForm.value;

      this.apiService.registerParticipant(formData).subscribe({
        next: (response) => {
          console.log('Participante cadastrado com sucesso!', response);
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          if (err.error?.message?.includes('E-mail já cadastrado')) {
            alert('Este email já está em uso. Por favor, utilize outro.');
          } else {
            alert('Ocorreu um erro durante o cadastro. Tente novamente.' + err);
          }
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}