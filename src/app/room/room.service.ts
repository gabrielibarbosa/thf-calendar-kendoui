import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get(`${environment.apiUri}/rooms`);
  }

  saveRoom(room) {
    return this.http.post(`${environment.apiUri}/rooms`, room);
  }

  updateRoom(room) {
    return this.http.put(`${environment.apiUri}/rooms`, room);
  }

  deleteRoom(id) {
    return this.http.delete(`${environment.apiUri}/rooms/${id}`);
  }
}
