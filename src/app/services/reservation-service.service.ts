import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private baseUrl = 'http://localhost:8083/resv';   // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getAll`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/get/${id}`);
  }

  addReservation(reservation: Reservation): Observable<any> { 
    const url = 'http://localhost:8083/resv/add';
    return this.http.post<any>(url, reservation); 
  }

  updateReservation( reservation: Reservation): Observable<any> {
    const url = `http://localhost:8083/resv/update`;
    return this.http.put(url, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
