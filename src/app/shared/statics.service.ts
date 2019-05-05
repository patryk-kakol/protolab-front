import { Injectable } from '@angular/core';
import { HazardStatement } from './hazardStatement';
import { PrecautionaryStatement } from './precautionaryStatement';
import { Pictogram } from './pictogram';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  private hazardStatementUrl = 'dto/hazardStatements';
  private precautionaryStatementsUrl = 'dto/precautionaryStatements';
  private pictogramsUrl = 'dto/pictograms';

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

  getPictograms(): Observable<Pictogram[]> {
    return this.http.get<Pictogram[]>(API_URL + this.pictogramsUrl)
      .pipe(
        tap(_ => console.log('fetched pictograms')),
        catchError(this.handleError<Pictogram[]>('getPictograms()', []))
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
