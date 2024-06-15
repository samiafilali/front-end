// src/app/services/ubidots.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbidotsService {
  private readonly apiUrl = 'https://industrial.api.ubidots.com/api/v1.6/devices/485519c7fc9e/'
  private readonly token = 'BBUS-4uvuoDZm9XjzV969ZALfoVaaG465s8'; // Replace with your Ubidots token

  constructor(private http: HttpClient) {}

  getSensorData(deviceId: string): Observable<any> {
    const url = `${this.apiUrl}/devices/${deviceId}/values`;
    return this.http.get(url, {
      headers: { 'X-Auth-Token': this.token }
    });
  }
}
