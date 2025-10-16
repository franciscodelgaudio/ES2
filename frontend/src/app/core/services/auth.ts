import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../../oauth.config';

@Injectable({ providedIn: 'root' })
export class Auth {
  private oauth = inject(OAuthService);

  login(loginHint?: string) {
    if (loginHint) {
      (this.oauth as any).initCodeFlow({ customQueryParams: { login_hint: loginHint } });
    } else {
      (this.oauth as any).initCodeFlow();
    }
  }

  logout() {
    this.oauth.logOut(); // opcional: this.oauth.logOut({ redirectUri: window.location.origin });
  }

  isLoggedIn(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  get profile() {
    return this.oauth.getIdentityClaims();
  }

/** Decodifica o Access Token para ler roles */
  private getAccessTokenClaims(): any | null {
    const tok = this.oauth.getAccessToken();
    if (!tok) return null;
    const parts = tok.split('.');
    if (parts.length !== 3) return null;
    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  /** Checa role no access token (realm roles e client roles) */
  hasRole(role: string): boolean {
    const claims = this.getAccessTokenClaims();
    const clientId = (authCodeFlowConfig as any).clientId as string; // <- usa o mesmo clientId que você configurou no Keycloak

    // Logs para depuração no NAVEGADOR (F12)
    console.log('[AUTH] access token claims:', claims);
    console.log('[AUTH] ID claims:', this.oauth.getIdentityClaims());
    console.log('[AUTH] clientId usado para resource_access:', clientId);

    if (!claims) return false;

    const realmRoles: string[] = claims?.realm_access?.roles ?? [];
    const clientRoles: string[] = claims?.resource_access?.[clientId]?.roles ?? [];

    console.log('[AUTH] realm roles:', realmRoles);
    console.log('[AUTH] client roles:', clientRoles);

    return realmRoles.includes(role) || clientRoles.includes(role);
  }
}
