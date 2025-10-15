// src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER, PLATFORM_ID, importProvidersFrom, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './oauth.config';

export function initAuth(oauth: OAuthService, platformId: Object) {
  return async () => {
    if (!isPlatformBrowser(platformId)) return;

    const origin = 'http://localhost:4200'; // http://localhost
    oauth.configure({ ...authCodeFlowConfig, redirectUri: origin });

    // 1) Descoberta do OP
    await oauth.loadDiscoveryDocument();

    // 2) WORKAROUND: se veio só ?iss (sem code/state), limpe para não travar rota
    const url = new URL(window.location.href);
    const hasAuthParams =
      url.searchParams.has('code') ||
      url.searchParams.has('state') ||
      url.searchParams.has('session_state');

    if (url.searchParams.has('iss') && !hasAuthParams) {
      window.history.replaceState({}, document.title, origin);
    }

    // 3) Tenta processar retorno do Code Flow (se houver)
    await oauth.tryLoginCodeFlow({
      onTokenReceived: () => {
        // remove ?code, ?state, etc. da barra
        window.history.replaceState({}, document.title, origin);
      }
    });

    // 4) Se ainda não logado, dispara o login
    if (!oauth.hasValidAccessToken()) {
      oauth.initCodeFlow();
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    importProvidersFrom(
      OAuthModule.forRoot({
        resourceServer: {
          allowedUrls: ['http://localhost:8081/api'],
          sendAccessToken: true,
        },
      })
    ),

    { provide: APP_INITIALIZER, multi: true, deps: [OAuthService, PLATFORM_ID], useFactory: initAuth },
  ],
};
