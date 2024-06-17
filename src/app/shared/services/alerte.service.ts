import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  private readonly url = 'http://localhost:8080/api/alertes'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  getAllAlertes(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getAlerteById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addAlerte(alerte: any): Observable<any> {
    return this.http.post(this.url, alerte).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(`Error Code: ${error.status}\nMessage: ${error.message}`);
    return throwError(() => new Error(`Error Code: ${error.status}\nMessage: ${error.message}`));
  }
}
