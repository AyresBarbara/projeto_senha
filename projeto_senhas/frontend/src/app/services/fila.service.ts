import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Senha {
  numero: string;
  tipo: 'SP' | 'SG' | 'SE';
  guiche?: number;
  emitidaEm?: string;
  atendidaEm?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilaService {

  private apiUrl = 'http://localhost:3000/api/filas'; // ajuste a URL do seu backend

  constructor(private http: HttpClient) { }

  emitirSenha(tipo: 'SP' | 'SG' | 'SE'): Observable<Senha> {
    return this.http.post<Senha>(`${this.apiUrl}/emitir`, { tipo });
  }

  chamarSenha(): Observable<Senha> {
    return this.http.get<Senha>(`${this.apiUrl}/chamar`);
  }

  relatorioDiario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio/diario`);
  }

  relatorioMensal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio/mensal`);
  }
}
