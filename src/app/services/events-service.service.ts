import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  private baseUrl = 'http://localhost:8086/Event';   // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/allEvents`);
  }

  createEvent(events: Events): Observable<any> { 
    const url = 'http://localhost:8086/Event/addEvent';
    return this.http.post<any>(url, events); 
  }

  updateEvent( events: Events): Observable<any> {
    const url = `http://localhost:8086/Event/updateEvent`;
    return this.http.put(url, events);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEvent/${id}`);
  }
  
}
