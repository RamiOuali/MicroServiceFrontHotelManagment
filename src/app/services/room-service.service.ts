import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room,TypeRoom, RoomStatus } from '../models/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  private baseUrl = 'http://localhost:8084/api/rooms';   // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getAll`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`);
  }

  addRoom(room: Room): Observable<any> { 
    const url = 'http://localhost:8084/api/rooms/add';
    return this.http.post<any>(url, room); 
  }

  updateRoomStatus(roomId: number, newStatus: String): Observable<any> {
    const url = `http://localhost:8084/api/rooms/UpdateRoom/${roomId}/${newStatus}`;
  
    return this.http.put(url, null);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
