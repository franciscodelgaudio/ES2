import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  private auth = inject(Auth);
  private router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home'); // ou '/'
      return;
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required) // mantemos só pela UI
    });
  }


  onSubmit(): void {
    if (!this.loginForm.valid) {
      alert('Por favor, preencha email e senha.');
      return;
    }
    const email = this.loginForm.value.email as string;
    // Em vez de “simular login”, redireciona para o Keycloak com o login_hint:
    this.auth.login(email);
  }

  // opcional: botão "Entrar com Keycloak" sem validar campos
  loginDirect() {
    this.auth.login();
  }
}
