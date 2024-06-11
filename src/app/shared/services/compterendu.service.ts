import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompteRendu } from '../classes/compterendu';

@Injectable({
  providedIn: 'root'
})
export class CompteRenduService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllCompteRendus(): Observable<CompteRendu[]> {
    return this.http.get<CompteRendu[]>(`${this.apiUrl}/compte-rendus`);
  }

  getCompteRenduById(id: number): Observable<CompteRendu> {
    return this.http.get<CompteRendu>(`${this.apiUrl}/compte-rendu/${id}`);
  }

  getCompteRendusByUserId(userId: number): Observable<CompteRendu[]> {
    return this.http.get<CompteRendu[]>(`${this.apiUrl}/compte-rendus/user/${userId}`);
  }

  saveCompteRendu(compteRendu: CompteRendu): Observable<CompteRendu> {
    return this.http.post<CompteRendu>(`${this.apiUrl}/compte-rendu`, compteRendu);
  }

  deleteCompteRendu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/compte-rendu/${id}`);
  }
}
