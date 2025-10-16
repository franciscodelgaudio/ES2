import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

// src/app/core/guards/auth-guard.ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  if (auth.isLoggedIn()) return true;
  auth.login(); // inicia o fluxo no OP
  return false;
};

