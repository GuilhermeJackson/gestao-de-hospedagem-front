import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showMessageErro(msg: string) {
    this.snackBar.open(msg, "Ok", {
      verticalPosition: "top",
      horizontalPosition: "end",
      duration: 5000,
      panelClass: ["red-snackbar"]
    })
  }

  showMessageSuccess(msg: string) {
    this.snackBar.open(msg, "Ok", {
      verticalPosition: "top",
      horizontalPosition: "end",
      duration: 5000,
      panelClass: ['green-snackbar']
    })
  }
}
