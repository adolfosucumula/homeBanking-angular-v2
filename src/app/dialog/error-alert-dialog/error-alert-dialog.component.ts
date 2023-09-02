import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-alert-dialog',
  templateUrl: './error-alert-dialog.component.html',
  styleUrls: ['./error-alert-dialog.component.scss']
})
export class ErrorAlertDialogComponent {


  title: string;
  message: string;
  buttonName: string;

  constructor(public dialogRef: MatDialogRef<ErrorAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
      this.title = data.title;
      this.message = data.message;
      this.buttonName = data.buttonName;
    }

  /**
   *
   */
  onNoClick(): void {
    this.dialogRef.close();
  };

}



/*------------------------------------------------------------------------------------ */


/**
 *
 */

export interface DialogData {
  title: string;
  message: string;
  buttonName: string;
}

