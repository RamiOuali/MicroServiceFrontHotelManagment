import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private baseUrl = 'http://localhost:8072/resv';   // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getAll`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/get/${id}`);
  }

  addReservation(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'/add', data)
  }

  UpdateReservation(data: any): Observable<any> {
    return this.http.put(this.baseUrl+'/update', data)
  }

  deleteReservation(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/delete/' + id);
  }
}
