import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainEvent } from '../../pages/event/event'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';


  registerParticipant(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/participants`, userData);
  }

  getAddressByCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getEvents(): Observable<MainEvent[]> {
    return this.http.get<MainEvent[]>(`${this.apiUrl}/events`);
  }


  subscribeToLecture(lectureId: number, participantId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`, {});
  }


  unsubscribeFromLecture(lectureId: number, participantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`);
  }

  createEvent(eventData: any): Observable<MainEvent> {
    return this.http.post<MainEvent>(`${this.apiUrl}/events`, eventData);
  }

  addLectureToEvent(eventId: number, lectureData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events/${eventId}/lectures`, lectureData);
  }

  getEventTypes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/event-types`);
}

  getEventManagers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/event-managers`);
}
}