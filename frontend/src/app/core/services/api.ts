import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}