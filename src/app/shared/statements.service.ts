import { Injectable } from '@angular/core';
import { HazardStatement } from './hazardStatement';
import { PrecautionaryStatement } from './precautionaryStatement';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StatementsService {

  private hazardStatementUrl = 'dto/hazardStatements';
  private precautionaryStatementsUrl = 'dto/precautionaryStatements';

  constructor(private http: HttpClient) { }

  getHazardStatements(): Observable<HazardStatement[]> {
    return this.http.get<HazardStatement[]>(API_URL + this.hazardStatementUrl)
      .pipe(
        tap(_ => console.log('fetched hazard statements')),
        catchError(this.handleError<HazardStatement[]>('getHazardStatements()', []))
      );
  }

  getPrecautionaryStatements(): Observable<PrecautionaryStatement[]> {
    return this.http.get<PrecautionaryStatement[]>(API_URL + this.precautionaryStatementsUrl)
      .pipe(
        tap(_ => console.log('fetched precautionary statements')),
        catchError(this.handleError<PrecautionaryStatement[]>('getPrecationaryStatements()', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
