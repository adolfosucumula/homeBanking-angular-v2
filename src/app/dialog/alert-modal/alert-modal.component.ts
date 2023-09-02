import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorAlertDialogComponent } from '../error-alert-dialog/error-alert-dialog.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {


  title: string;
  message: string;
  buttonName: string;

  constructor(public dialogRef: MatDialogRef<AlertModalComponent>,
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

