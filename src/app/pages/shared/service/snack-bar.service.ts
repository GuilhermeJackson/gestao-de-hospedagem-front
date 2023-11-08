import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string) {
    this.snackBar.open(msg, "Fechar", {
      verticalPosition: "top",
      horizontalPosition: "start",
    })
  }
}
