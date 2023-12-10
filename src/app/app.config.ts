import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AuthConfig,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/platform-browser';
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/hotel-management-realm',
  tokenEndpoint:
    'http://localhost:8180/realms/hotel-management-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'front-client',
  responseType: 'code',
  showDebugInformation: true,
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        };
      },
      multi: true,
      deps: [OAuthService],
    },
  ],
};
