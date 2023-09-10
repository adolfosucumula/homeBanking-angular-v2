import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { CreditAccountUtils } from '../services/CreditAccountUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountPostService } from '../../crud-account/service/account-post.service';
import { AccountGetService } from '../../account/service/account-get.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AccountTransactionUtils } from '../../send-money/services/AccountTransactionUtils';
import { getFormattedCurrency_deDE } from 'src/app/utils/functions/formatCurrency';
import { EditAccountUtils } from '../../crud-account/utils/EditAccountUtils';
import { AccountTransactions } from 'src/app/models/account-transactions.model';
import { formatDateWithPipe, getSystemDate, getSystemPipeTime } from 'src/app/utils/functions/system-timestamp';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.scss'],
  providers: [CurrencyPipe, DatePipe,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class CreditAccountComponent {
//
constructor(
  private currencyPipe: CurrencyPipe,
  private accountGetServices: AccountGetService,
  private route: ActivatedRoute,
  private router: Router,
  private snackBarAlert: SnackBarAlertMessage,
  private localStore: StorageService,
  private accTransa: AccountTransactionUtils
  ) { }

userData = this.localStore.getUser();
date = new FormControl(new Date());
serializedDate = new FormControl(new Date().toISOString());
accountData: any;
currentBalance: any;
tTypes: string[] = new AccountTransactions().getTypes();
transactionType: string = ''

/**
* Create an object of instance using the FormGroup
* class to manage the form fields value, controlling and validate them
*/
accountForm: FormGroup = this.accTransa.formGroup();

submitted = false;



ngOnInit(): void {

  //get router parameter
  this.route.paramMap.subscribe((param) => {
    const id = Number(param.get('id'));
    this.transactionType = String(param.get('type'))

    this.getAccountById(id, this.transactionType);

  });

}

//Call AbstractControl class to check if the data from form fields conforms to the rule defined above
get _fC(): {[key: string]: AbstractControl } {
  return this.accountForm.controls;
};


onSubmit(): void {
  this.submitted = true;

  if(this.accountForm.invalid){
    return;
  }

  if(this.accountForm.value.account === this.accountForm.value.sourceAccount){
    this.snackBarAlert.openSnackBar("The source account must be different from account", "Information", 10, 'bottom', "left")
    return ;
  }

  //this.utils.getUpdateCreditAccount(this.accountForm.value.account, this.accountForm);

    this. registOperation(this.accountForm, this.accountData, this.transactionType);

};


getAccountById(id: number = 0, type: string){
  if(id > 0){
    this.accountGetServices.getById(id).subscribe((data: any) => {
        this.accountForm.patchValue({
          tType: type,
          account: data.account,
          owner: data.owner,
          balanceBefore: data.currentBalance,
          amount: '0',
          xAccount: '0000000000000',
          xOwner: 'Unknow',
          operator: this.userData.username,
          status: 'Finished',
          createdAt: ''
        });
        this.currentBalance = data.currentBalance
        //Preserve the account register to be used at next step
        this.accountData = data;
    })
  }
}

   /**
     * Compare the value of this parameter with each account from the database to get its ID
     * @param account the account entered in field form
     */
    registOperation(form: FormGroup, accountData: any, transactionType: string){

        if(!accountData){ this.snackBarAlert.openSnackBar("This account was not found!" , "Information", 10, 'top', "left") }
        else{
          let balance = accountData.currentBalance;

          let amount = form.value.amount;

          let finalBalance = 0;

          if(transactionType && (transactionType === 'Deposit' || transactionType === 'Credit')){

            finalBalance = parseFloat(balance) + parseFloat(amount);
          }
          else if(transactionType && transactionType === 'Debit'){

            if(Number(amount) > Number(balance) ){
              this.snackBarAlert.openSnackBar("Insufficient funds to continue the operation. Am " +
              (amount - Number(balance) < 0) + " Bf "+ Number(balance),
              "Information", 10, 'bottom', "left");
              return;
            }

            finalBalance = parseFloat(balance) - parseFloat(amount);
          }

          this.accTransa.registTransaction(
            form,
            accountData,
            amount,
            finalBalance.toString(),
            formatDateWithPipe(form.value.createdAt) + ' ' + getSystemPipeTime()
          );

          this.router.navigate(['/balance'])

        }

    }


}
