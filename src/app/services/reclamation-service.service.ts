import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationServiceService {
  private baseUrl = 'http://localhost:8085/reclamation';   // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/all`);
  }

  addReclamation(reclamation: Reclamation): Observable<any> { 
    const url = 'http://localhost:8085/reclamation/add';
    return this.http.post<any>(url, reclamation); 
  }

  updateReclamation( reclamation: Reclamation): Observable<any> {
    const url = `http://localhost:8085/reclamation/update`;
    return this.http.put(url, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  acceptReclamation(reclamation: Reclamation): Observable<any> { 
    const url = 'http://localhost:8085/reclamation/accept/${id}';
    return this.http.post<any>(url, reclamation); 
  }

  rejectReclamation(reclamation: Reclamation): Observable<any> { 
    const url = 'http://localhost:8085/reclamation/reject/${id}';
    return this.http.post<any>(url, reclamation); 
  }



}
