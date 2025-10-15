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
}
