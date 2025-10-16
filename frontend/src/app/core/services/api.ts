import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainEvent } from '../../pages/event/event'; // Ajuste o caminho se a sua pasta de eventos for diferente

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  registerParticipant(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/participants`, userData);
  }

  getAddressByCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }


  // --- NOVOS MÉTODOS PARA EVENTOS E PALESTRAS ---

  /**
   * Busca a lista de todos os eventos principais da API.
   */
  getEvents(): Observable<MainEvent[]> {
    return this.http.get<MainEvent[]>(`${this.apiUrl}/events`);
  }

  /**
   * Inscreve um participante numa palestra específica.
   * @param lectureId O ID da palestra.
   * @param participantId O ID do participante.
   */
  subscribeToLecture(lectureId: number, participantId: number): Observable<void> {
    // Corresponde ao endpoint: @PostMapping("/lectures/{lectureId}/participants/{participantId}")
    return this.http.post<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`, {});
  }

  /**
   * Desinscreve um participante de uma palestra específica.
   * @param lectureId O ID da palestra.
   * @param participantId O ID do participante.
   */
  unsubscribeFromLecture(lectureId: number, participantId: number): Observable<void> {
    // Corresponde ao endpoint: @DeleteMapping("/lectures/{lectureId}/participants/{participantId}")
    return this.http.delete<void>(`${this.apiUrl}/lectures/${lectureId}/participants/${participantId}`);
  }
}