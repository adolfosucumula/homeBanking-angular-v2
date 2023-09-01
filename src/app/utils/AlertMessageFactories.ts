import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AlertModalComponent } from "../dialog/alert-modal/alert-modal.component";
import { SuccessAlertDialogComponent } from "../dialog/success-alert-dialog/success-alert-dialog.component";
import { ErrorAlertDialogComponent } from "../dialog/error-alert-dialog/error-alert-dialog.component";

@Injectable({
  providedIn: 'root'
})

export class AlertMessageFactories {

  constructor( private dialog: MatDialog ) {}

  /**
   *
   * @param title
   * @param message
   * @param buttonName
   * @param enterAnimationDuration by default use '3000ms'
   * @param exitAnimationDuration by default use '1500ms'
   * @param width by default use '250px'
   */
  openInfoAlertDialog(
    title: string = 'Information Alert',
    message: string = 'Alert message dialog!',
    buttonName: string = 'Close',
    enterAnimationDuration: string = '3000ms',
    exitAnimationDuration: string = '1500ms',
    width: string = '500px'
  ): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
        data: {title: title , message: message, buttonName: buttonName},
        width: width,
        enterAnimationDuration,
        exitAnimationDuration,
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  };



  /* -----------------------------------------------------------------------------------*/

  /**
   *
   * @param title Default text 'Error Alert'
   * @param message default message 'Error alert message dialog'
   * @param buttonName default text 'Close'
   * @param enterAnimationDuration by default use '3000ms'
   * @param exitAnimationDuration by default use '1500ms'
   * @param width by default use '250px'
   */
  openSuccessAlertDialog(
    title: string = 'Success Alert',
    message: string = 'Success alert message dialog!',
    buttonName: string = 'Close',
    enterAnimationDuration: string = '3000ms',
    exitAnimationDuration: string = '1500ms',
    width: string = '500px'
  ): void {
    const dialogRef = this.dialog.open(SuccessAlertDialogComponent, {
        data: {title: title , message: message, buttonName: buttonName},
        width: width,
        enterAnimationDuration,
        exitAnimationDuration,
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  };


  /* -----------------------------------------------------------------------------------*/

  /**
   *
   * @param title Default text 'Error Alert'
   * @param message default message 'Error alert message dialog'
   * @param buttonName default text 'Close'
   * @param enterAnimationDuration by default use '3000ms'
   * @param exitAnimationDuration by default use '1500ms'
   * @param width by default use '250px'
   */
  openErrorAlertDialog(
    title: string = 'Error Alert',
    message: string = 'Error alert message dialog!',
    buttonName: string = 'Close',
    enterAnimationDuration: string = '3000ms',
    exitAnimationDuration: string = '1500ms',
    width: string = '500px'
  ): void {
    const dialogRef = this.dialog.open(ErrorAlertDialogComponent, {
        data: {title: title , message: message, buttonName: buttonName},
        width: width,
        enterAnimationDuration,
        exitAnimationDuration,
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  };



}

