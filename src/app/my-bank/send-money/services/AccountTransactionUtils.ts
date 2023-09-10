
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

  debitFormGroup (): FormGroup  {
    return new FormGroup({
      targetAccount: new FormControl(null),
      owner2: new FormControl(''),
      amount: new FormControl(''),
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
      targetAccount,
      owner2,
      amount,
      operator,
      status,
      createdAt
    } = form.value;

    return {
      targetAccount,
      owner2,
      amount,
      operator,
      status,
      createdAt
    };
  };

  /**
   *
   * @returns
   */
  validateForm(): FormGroup {
    return this.formBuilder.group({
      owner2: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      targetAccount: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],

      amount: ['', Validators.required ],
      //balanceAfter: ['', Validators.required ],
      operator: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      //status: ['', [Validators.required, Validators.minLength(2)] ],
      createdAt: ['', Validators.required ],
    });

  }

  debitTransaction(
    form: FormGroup,
    accountData: any,
    sourceAccount: string | any,
    owner1: string,
    balanceBefore: string,
    amount: string,
    balanceAfter: string,
    status: string,
    date: any
    ){

      this.postServices.create(
        sourceAccount,
        this.getFormData(form).owner2,
        this.getFormData(form).targetAccount,
        this.getFormData(form).owner2,
        balanceBefore,
        amount,
        balanceAfter,
        this.getFormData(form).operator,
        'debit',
        status,
        date
      )
      .subscribe((data: any) =>  this.updateBalanceAsDebit(form, accountData, balanceAfter, date))
  }

  creditTransaction(
    form: FormGroup,
    accountData: any,
    sourceAccount: string | any,
    owner1: string,
    balanceBefore: string,
    amount: string,
    balanceAfter: string,
    status: string,
    date: any
    ){
      this.postServices.create(
        sourceAccount,
        owner1,
        this.getFormData(form).targetAccount,
        this.getFormData(form).owner2,
        balanceBefore,
        amount,
        balanceAfter,
        this.getFormData(form).operator,
        'credit',
        status,
        date
      )
      .subscribe((data: any) =>  this.updateBalanceAsDebit(form, accountData, balanceAfter, date))
  };

updateBalanceAsDebit(
    form: FormGroup,
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
      .subscribe()
  }



}

