import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  registerParticipant(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/participants`, userData);
  }

  getAddressByCep(cep: string) {
    // antes: https://viacep.com.br/ws/${cep}/json/
    return this.http.get<any>(`/viacep/ws/${cep}/json/`);
  }
}