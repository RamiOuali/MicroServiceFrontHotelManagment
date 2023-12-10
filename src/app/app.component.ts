import { Component } from '@angular/core';
import {
  OAuthService,
  NullValidationHandler,
  AuthConfig,
} from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // constructor(private oauthService: OAuthService) {
  //   this.configure();
  // }
  // title = 'HotelManagement';
  // authConfig: AuthConfig = {
  //   issuer: 'http://localhost:8180/realms/hotel-management-realm',
  //   redirectUri: window.location.origin +"/employee" ,
  //   clientId: 'test_front',
  //   responseType: 'code',
  //   scope:'openid',
  //   disableAtHashCheck: true,
  //   showDebugInformation: true,
  // };
  // public login() {
  //   this.oauthService.initLoginFlow();
  // }

  // public logoff() {
  //   this.oauthService.logOut();
  // }

  // private configure() {
  //   this.oauthService.configure(this.authConfig);
  //   this.oauthService.tokenValidationHandler = new NullValidationHandler();
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }
}
