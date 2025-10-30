// src/app/core/auth/auth.service.ts (ou onde você mantiver seu Auth)
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  // Guarde estado simples em localStorage para persistir no refresh
  private readonly KEY = 'demo_auth';

  login(loginHint?: string) {
    // Sem OAuth: apenas marca como logado (opcionalmente salve um "perfil fake")
    localStorage.setItem(this.KEY, JSON.stringify({
      loggedIn: true,
      profile: { name: loginHint ?? 'Usuário', email: '' },
      roles: [] as string[], // ajuste se quiser simular roles
    }));
  }

  logout() {
    localStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    try {
      const data = JSON.parse(localStorage.getItem(this.KEY) ?? 'null');
      return !!data?.loggedIn;
    } catch {
      return false;
    }
  }

  get profile(): any | null {
    try {
      const data = JSON.parse(localStorage.getItem(this.KEY) ?? 'null');
      return data?.profile ?? null;
    } catch {
      return null;
    }
  }

  /** Mantém a assinatura, sempre disponível sem OAuth */
  hasRole(role: string): boolean {
    try {
      const data = JSON.parse(localStorage.getItem(this.KEY) ?? 'null');
      const roles: string[] = data?.roles ?? [];
      return roles.includes(role);
    } catch {
      return false;
    }
  }
}
