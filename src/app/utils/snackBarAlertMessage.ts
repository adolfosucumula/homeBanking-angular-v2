import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackBarAlertMessage {

  constructor(private _snackBar: MatSnackBar){}


  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private durationInSeconds = 10;

   /**
     * Snackbar alert message
     * For 'xPosition' the horizontal position the values allowed are: start, center, end, left, right
     * For 'yPosition' the vertical position the values allowed are: top and bottom
     *
    * @param message here you put the message you want to show
    * @param action here you define the title or the name of the button
    * @param durationInSec is the variable to store the time in second to show the message
    * @param yPosition
    * @param xPosition
    */
  openSnackBar(message: string, action: string, durationInSec: number, yPosition:
    MatSnackBarVerticalPosition, xPosition: MatSnackBarHorizontalPosition) {
    this.durationInSeconds = durationInSec === null ? 7 : durationInSec;
    this.horizontalPosition = xPosition === null ? 'center' : xPosition;
    this.verticalPosition = yPosition === null ? 'top' : yPosition;

    this._snackBar.open(message, action);
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

}
