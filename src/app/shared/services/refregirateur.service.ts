// src/app/services/refregirateur.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefregirateurService {
  private readonly url = 'http://localhost:8080/refrigerateurs';

  constructor(private http: HttpClient) { }

  getAllRefregirateurs(): Observable<any> {
    return this.http.get(this.url);
  }

  getRefrigerateurById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getRefrigerateurByDeviceId(deviceId: string): Observable<any> {
    const url = `${this.url}/device/${deviceId}`;
    return this.http.get(url);
  }

  addRefrigerateur(refrigerateur: any): Observable<any> {
    return this.http.post(this.url, refrigerateur);
  }

  editRefrigerateur(refrigerateur: any): Observable<any> {
    return this.http.put(this.url, refrigerateur);
  }

  deleteRefrigerateur(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
