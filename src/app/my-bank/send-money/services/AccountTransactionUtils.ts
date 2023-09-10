
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PostTransactionService } from "./post-transaction.service";
import { getFormattedCurrency_deDE } from "src/app/utils/functions/formatCurrency";
import { AccountUpdateService } from "../../crud-account/utils/account-update.service";


@Injectable({
  providedIn: 'root',
})

export class AccountTransactionUtils {


  constructor(private postServices: PostTransactionService,
    private updateAccountService: AccountUpdateService,
    private formBuilder: FormBuilder
    ) {}
  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */

  formGroup (): FormGroup  {
    return new FormGroup({
      tType: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.maxLength(20) ]
      }),
      account: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$') ]
      }),
      owner: new FormControl <string> ("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)]
      }),
      balanceBefore: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required ]
      }),
      amount: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required ]
      }),
      xAccount: new FormControl <string> ("", {
        nonNullable: false,
        validators: [ Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$') ]
      }),
      xOwner: new FormControl <string> ("", {
        nonNullable: false,
        validators: [ Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200) ]
      }),
      operator: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200) ]
      }),
      status: new FormControl <string> ("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(20)]
      }),
      createdAt: new FormControl <string> ("", {
        nonNullable: true,
        validators: [ Validators.required ]
      }),

      /*targetAccount: new FormControl(null),
      owner2: new FormControl(''),
      amount: new FormControl(''),
      operator: new FormControl(''),
      status: new FormControl(''),
      createdAt: new FormControl(''),*/
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
      tType,
      account,
      owner,
      balanceBefore,
      amount,
      balanceAfter,
      xAccount,
      xOwner,
      operator,
      status,
      createdAt,
    } = form.value;

    return {
      tType,
      account,
      owner,
      balanceBefore,
      amount,
      balanceAfter,
      xAccount,
      xOwner,
      operator,
      status,
      createdAt,
    };
  };

  debitTransaction(
    form: FormGroup,
    accountData: any,
    balanceAfter: string,
    date: any
    ){

      this.postServices.create(
        this.getFormData(form).tType,
        this.getFormData(form).account,
        this.getFormData(form).owner,
        this.getFormData(form).balanceBefore,
        this.getFormData(form).amount,
        this.getFormData(form).balanceAfter,
        this.getFormData(form).xAccount,
        this.getFormData(form).xOwner,
        this.getFormData(form).operator,
        this.getFormData(form).status,
        date,
      )
      .subscribe((data: any) =>  this.updateBalance(this.getFormData(form).tType,accountData, balanceAfter, date))
  }

  registTransaction(
    form: FormGroup,
    accountData: any,
    amount: string,
    balanceAfter: string,
    date: any
    ){

      const data = this.getFormData(form);

      this.postServices.create(
        data.tType,
        data.account,
        data.owner,
        data.balanceBefore,
        amount,
        balanceAfter,
        data.xAccount,
        data.xOwner,
        data.operator,
        data.status,
        date,
      )
      .subscribe((data: any) =>  this.updateBalance(data.tType, accountData, balanceAfter, date))
  };

updateBalance(
    tType: string,
    accountData: any,
    balanceAfter: string,
    date: any
    ){

      this.updateAccountService.update(
        accountData.id,
        accountData.account,
        'IBAN',
        'SWIFT',
        accountData.owner,
        accountData.ownerDoc,
        accountData.initialBalance,
        balanceAfter,
        accountData.currency,
        date,
        accountData.isActive
      )
      .subscribe((data: any) =>{

      })
  }



}

