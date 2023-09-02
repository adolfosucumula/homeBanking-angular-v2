import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-alert-dialog',
  templateUrl: './success-alert-dialog.component.html',
  styleUrls: ['./success-alert-dialog.component.scss']
})
export class SuccessAlertDialogComponent {


  title: string;
  message: string;
  buttonName: string;

  constructor(public dialogRef: MatDialogRef<SuccessAlertDialogComponent>,
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
