import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainEvent } from '../../pages/event/event';

interface ParticipantDTO {
  eventParticipantId?: number; // seu backend pode devolver esse nome
  id?: number;                  // ou esse
  name?: string;
  email?: string;
  // ...demais campos que o backend retornar
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // Em dev, considere trocar para apenas '/api' e usar proxy do Angular
  private readonly apiUrl = 'http://localhost:8081/api';

  registerParticipant(userData: any): Observable<HttpResponse<ParticipantDTO>> {
    // observe: 'response' para termos status + body
    return this.http.post<ParticipantDTO>(`${this.apiUrl}/participants`, userData, {
      observe: 'response',
    });
  }

  getAddressByCep(cep: string) {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getEvents() {
    return this.http.get<MainEvent[]>(`${this.apiUrl}/events`);
  }

  subscribeToLecture(lectureId: number, participantId: number) {
    return this.http.post<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`, {});
  }

  unsubscribeFromLecture(lectureId: number, participantId: number) {
    return this.http.delete<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`);
  }

  createEvent(eventData: any) {
    return this.http.post<MainEvent>(`${this.apiUrl}/events`, eventData);
  }

  addLectureToEvent(eventId: number, lectureData: any) {
    return this.http.post<any>(`${this.apiUrl}/events/${eventId}/lectures`, lectureData);
  }

  getEventTypes() {
    return this.http.get<any[]>(`${this.apiUrl}/event-types`);
  }

  getEventManagers() {
    return this.http.get<any[]>(`${this.apiUrl}/event-managers`);
  }
}
