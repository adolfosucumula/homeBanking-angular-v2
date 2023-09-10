
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackBarAlertMessage } from "src/app/utils/snackBarAlertMessage";
import { AccountUpdateService } from "./account-update.service";


@Injectable({
  providedIn: 'root'
})

export class EditAccountUtils {

  constructor(private accountService: AccountUpdateService
    ,private route: ActivatedRoute, private router: Router, private snackAlert: SnackBarAlertMessage) {}


  editFormGroup (): FormGroup  {
    return new FormGroup({
      account: new FormControl(null),
      iban: new FormControl(''),
      swift: new FormControl(''),
      owner: new FormControl(''),
      ownerDoc: new FormControl(null),
      initialBalance: new FormControl(''),
      currency: new FormControl(''),
      createdAt: new FormControl(''),
      isActive: new FormControl(false),
    });

  };


  /**
   *  This method gets the Form Group data comes from a form and pass them
   * to a variables and returns the same variables with the values received
   * @param form is a group of form fields
   * @returns
   */
  getFormData(form: FormGroup){

    let {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      isActive} = form.value;

      isActive = isActive === "1" ? true : false;

    return {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      isActive
    };

  };

  replaceData(form: FormGroup, currentBalance: string, createdAt: string): FormGroup{
    return new FormGroup({
      account: new FormControl(form.value.account),
      iban: new FormControl(form.value.iban),
      swift: new FormControl(form.value.swift),
      owner: new FormControl(form.value.owner),
      ownerDoc: new FormControl(form.value.ownerDoc),
      initialBalance: new FormControl(form.value.initialBalance),
      currentBalance: new FormControl(currentBalance),
      currency: new FormControl(form.value.currency),
      createdAt: new FormControl(createdAt),
      isActive: new FormControl(form.value.isActive),
    });
  };

  updateAccount(id: number,account: number, iban: string, owner: string, swift: string,
    ownerDoc: number, bBefore: string, bAfter:string, currency: string, form: FormGroup){

    this.accountService.update(id,
      account,
      iban,
      owner,
      swift,
      ownerDoc,
      bBefore,
      bAfter,
      currency,
      this.getFormData(form).createdAt,
      true
      )
    .subscribe({
      next: data => {
        console.log("========= Success to edit account! =============")
        console.log(JSON.stringify(data, null, 2))
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log("========= Failed to edit account! =============")
        console.log(JSON.stringify(err, null, 2))
        if (err.error) {
          //this.errorMessage = JSON.parse(err.error).message;
        } else {

          //this.errorMessage = "Error with status: " + err.status;
        }
      }
    })

  }

  updateAccountBalance(id: number,
      account: number,
      iban: string,
      swift: string,
      owner: string,
      ownerDoc: number,
      initialBalance: string,
      currentBalance: string,
      currency: string,
      createdAt: string,
      updatedAt: string,
      isActive: boolean
    ){

    this.accountService.updateBalance
    (  id,
      account,
      owner,
      ownerDoc,
      currentBalance,
      createdAt
      )
      .subscribe({
      next: data => {
        console.log("========= Success to update account! =============")
        console.log(JSON.stringify(data, null, 2))
        this.snackAlert.openSnackBar("Regist updated successfull. ", "Information", 10, 'bottom', "left")
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log("========= Failed to update account! =============")
        console.log(JSON.stringify(err, null, 2))

      }
    })

  }

}
