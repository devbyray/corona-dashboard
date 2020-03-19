import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfiguration } from './api.configuration';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;  
  private options: any;

  constructor(private http: HttpClient, private config: ApiConfiguration) {   
    this.headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
    })
    this.options = ({ headers: this.headers });
  }

  public getLocations(): Observable<any> {
    return this.http.get<any[]>(`${this.config.baseUrlWithVersion}${this.config.locationsEndpoint}`, this.options)
      .pipe(catchError(this.handleError));
  }

  public getLatest(): Observable<any> {
    return this.http
      .get<any>(`${this.config.baseUrlWithVersion}${this.config.latestEndpoint}`, this.options)
      .pipe(catchError(this.handleError));
  }

  public getLocationNL(): Observable<any> {
    return this.http.get<any>(`${this.config.baseUrlWithVersion}${this.config.locationsEndpoint}${this.config.netherlandsParam}`, this.options)
      .pipe(catchError(this.handleError));
  }

  private handleError (error: Error): Observable<never> {
    const errorMessage = error.message;
    return throwError(errorMessage);
  }
}
