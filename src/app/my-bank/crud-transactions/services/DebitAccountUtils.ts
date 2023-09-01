
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DebitServicesService } from "./debit-services.service";


@Injectable({
  providedIn: 'root'
})

export class DebitAccountUtils {


  constructor(private debitServices: DebitServicesService) {}
  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */

  debitFormGroup (): FormGroup  {
    return new FormGroup({
      owner: new FormControl(''),
      account: new FormControl(null),
      balanceBefore: new FormControl(''),
      amount: new FormControl(''),
      balanceAfter: new FormControl(''),
      operator: new FormControl(''),
      status: new FormControl(''),
      createdAt: new FormControl(''),
    });

  };

  /**
   *  This method gets the Form Group data comes from a form and pass them
   * to a variables and returns the same variables with the values received
   * @param form is a group of form fields
   * @returns
   */
  getFormData(form: FormGroup){

    const {
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    } = form.value;

    return {
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    };
  };

  debitAccount(form: FormGroup, balanceBefore: string,
    balanceAfter: string, status: string
    ){
    this.debitServices.create(
        this.getFormData(form).owner,
        this.getFormData(form).account,
        balanceBefore,
        this.getFormData(form).amount,
        balanceAfter,
        this.getFormData(form).operator,
        status,
        this.getFormData(form).createdAt,
      ).subscribe({
        next: data => {
          console.log("========= Success to debit account! =============")
          console.log(JSON.stringify(data, null, 2))
        },
        error: err => {
          console.log("========= Failed to debit account! =============")
          console.log(JSON.stringify(err, null, 2))
        }
    })
  }


  updateAccountBalance(){

  }



}

