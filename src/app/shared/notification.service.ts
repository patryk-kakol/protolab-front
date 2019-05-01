import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  config: MatSnackBarConfig = {
    duration: 1500,
   politeness: 'assertive'
  };

  constructor(public snackBar: MatSnackBar) { }

  notify(message: string): void {
    this.snackBar.open(message, '', this.config);
  }

}


