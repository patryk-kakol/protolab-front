import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Compound } from '../shared/compound';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private compoundUrl = 'dto/compounds';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  compoundForm = this.formBuilder.group({
    compoundId: [0],
    name: ['', Validators.required],
    cas: ['', Validators.required],
    we: ['', Validators.required],
    formula: ['', Validators.required],
    un: [null],
    baseClass: [null],
    helperClass: [null],
    packagingGroup: [null],
    hazardStatementDtos: [[]],
    precautionaryStatementDtos: [[]],
    pictogramDtos: [[]]
  });

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private notificationService: NotificationService) {}

  getCompounds(): Observable<Compound[]> {
    return this.http.get<Compound[]>(API_URL + this.compoundUrl)
      .pipe(
        tap(_ => console.log('Loaded compounds')),
        catchError(this.handleError<Compound[]>('getCompounds()', []))
      );
  }

  addCompound(compound: Compound): Observable<Compound> {
    return this.http
      .post<Compound>(API_URL + this.compoundUrl, compound, this.httpOptions)
      .pipe(
        tap(_ => this.notificationService.notify('Compound added')),
        catchError(this.handleError<Compound>('addCompound'))
      );
  }

  updateCompound(compound: Compound): Observable<Compound> {
    return this.http
      .put<Compound>(API_URL + this.compoundUrl, compound, this.httpOptions)
      .pipe(
        tap(_ => this.notificationService.notify('Compound updated')),
        catchError(this.handleError<Compound>('updateCompound'))
      );
  }

  deleteCompound(compoundId: number): Observable<{}> {
    const url = `${API_URL}${this.compoundUrl}/${compoundId}`;
    return this.http
      .delete<Compound>(url, this.httpOptions)
      .pipe(
        tap(_ => this.notificationService.notify('Compound deleted')),
        catchError(this.handleError<Compound>('addCompound'))
      );
  }

  populateForm(record: Compound): void {
    this.compoundForm.setValue(record);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  initializeCompoundForm(): void {
    this.compoundForm.setValue({
      compoundId: 0,
      name: '',
      cas: '',
      we: '',
      formula: '',
      un: null,
      baseClass: null,
      helperClass: null,
      packagingGroup: null,
      hazardStatementDtos: [],
      precautionaryStatementDtos: [],
      pictogramDtos: []
    });
  }

  toggleNeutralCompound(isNeutral: boolean): void {
    const nonNeutralParams =  ['un', 'baseClass', 'helperClass', 'packagingGroup'];
    for (const param of nonNeutralParams) {
      if (isNeutral) {
        this.compoundForm.get(param).disable();
        this.compoundForm.get(param).setValue(null);
      } else {
        this.compoundForm.get(param).enable();
      }
    }
  }

}
