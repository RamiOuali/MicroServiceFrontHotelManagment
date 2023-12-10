import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from 'src/app/models/employee.mpdel';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8082';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  addEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/employee/add`;
    return this.http.post<Employee>(url, employee).pipe(
      catchError((error: any) => {
        console.error('Error ', error);
        return throwError(() => error);
      })
    );
  }
  update(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/employee/update`;
    return this.http.put<Employee>(url, employee).pipe(
      catchError((error: any) => {
        console.error('Error ', error);
        return throwError(() => error);
      })
    );
  }
  delete(employee: number): Observable<Employee> {
    const url = `${this.baseUrl}/employee/delete/${employee}`;
    return this.http.delete<Employee>(url).pipe(
      catchError((error: any) => {
        console.error('Error ', error);
        return throwError(() => error);
      })
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    console.log(this.keycloakService.getKeycloakInstance().token);
    const url = `${this.baseUrl}/employee/getAll`;
    return this.http
      .get<Employee[]>(url, {
        headers: {
          Authorization: `Bearer ${
            this.keycloakService.getKeycloakInstance().token
          }`,
        },
      })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching', error);
          return throwError(() => error);
        })
      );
  }
  getEmployeeById(employeeId: number): Observable<Employee> {
    const url = `${this.baseUrl}/employee/get/${employeeId}`;
    return this.http
      .get<Employee>(url, {
        headers: {
          Authorization: `Bearer ${
            this.keycloakService.getKeycloakInstance().token
          }`,
        },
      })
      .pipe(
        catchError((error: any) => {
          console.error(`Error fetching employee with ID ${employeeId}`, error);
          return throwError(() => error);
        })
      );
  }
}
