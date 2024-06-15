// src/app/services/alerte.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UbidotsService } from './ubidots.service';
import { RefregirateurService } from './refregirateur.service';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  private readonly url = 'http://localhost:8080/api/alert';
  private readonly thresholdCheckInterval = 60000; // 1 minute

  constructor(
    private http: HttpClient,
    private ubidotsService: UbidotsService,
    private refrigerateurService: RefregirateurService
  ) {
    // Check thresholds periodically
    timer(0, this.thresholdCheckInterval).pipe(
      switchMap(() => this.checkThresholds())
    ).subscribe();
  }

  getAllAlertes(): Observable<any> {
    return this.http.get(this.url);
  }

  getAlerteById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  addAlerte(alerte: any): Observable<any> {
    return this.http.post(this.url, alerte);
  }

  private checkThresholds(): Observable<any> {
    // Example deviceId, replace with your actual deviceId
    const deviceId = '666cbd811a63ef09a453b1ce';

    return this.ubidotsService.getSensorData(deviceId).pipe(
      switchMap(data => {
        return this.getRefrigerateurByDeviceId(deviceId).pipe(
          map(refrigerateur => {
            const alertes = [];

            data.results.forEach(sensorData => {
              const { value, variable } = sensorData;

              if (variable === 'temperature') {
                if (value < refrigerateur.temperatureMin || value > refrigerateur.temperatureMax) {
                  alertes.push(this.createAlerte(refrigerateur, variable, value));
                }
              } else if (variable === 'humidite') {
                if (value < refrigerateur.humiditeMin || value > refrigerateur.humiditeMax) {
                  alertes.push(this.createAlerte(refrigerateur, variable, value));
                }
              }
            });

            return alertes;
          })
        );
      }),
      switchMap(alertes => {
        return alertes.length > 0 ? this.http.post(this.url, alertes) : [];
      })
    );
  }

  private getRefrigerateurByDeviceId(deviceId: string): Observable<any> {
    // Remplacez cette URL par celle de votre backend qui récupère les données du réfrigérateur par l'ID de l'appareil
    const url = `http://localhost:8080/api/refrigerateurs/device/${deviceId}`;
    return this.http.get(url);
  }

  private createAlerte(refrigerateur: any, variable: string, value: number): any {
    return {
      type: variable,
      status: value < refrigerateur[`${variable}Min`] ? 'Basse' : 'Haute',
      refrigerateur: refrigerateur,
      capteur: { id: refrigerateur.capteur.id },
      value: value,
      date: new Date()
    };
  }
}
