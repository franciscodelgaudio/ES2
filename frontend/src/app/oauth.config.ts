// src/app/oauth.config.ts
import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/es2',
  redirectUri: '', // override no APP_INITIALIZER
  clientId: 'es2-frontend',
  responseType: 'code',
  scope: 'openid profile email',
  requireHttps: false,
  showDebugInformation: true,
  // opcional em http:
  // strictDiscoveryDocumentValidation: false,
};
