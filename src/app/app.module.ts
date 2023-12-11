import {APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
// import { initKeycloak } from './init-keycloak';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { EmployeeAddComponent } from './employee-management/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-management/employee-edit/employee-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {EventManagementModule } from './event-management/event-management.module';
import { ReservationModule } from './reservations-management/reservation.module';
import { ReservationsComponent } from './reservations-management/reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReservationModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
    EventManagementModule,
  ],
  // providers: [
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initKeycloak,
  //     multi: true,
  //     deps: [KeycloakService]
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
