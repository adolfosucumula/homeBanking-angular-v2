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
constructor(private formBuilder: FormBuilder,
  private currencyPipe: CurrencyPipe,
  private accountGetServices: AccountGetService,
  private utils: CreditAccountUtils,
  private route: ActivatedRoute,
  private snackBarAlert: SnackBarAlertMessage,
  private localStore: StorageService,
  private datePipe: DatePipe,
  private accTransa: AccountTransactionUtils,
  private editAccountUtils: EditAccountUtils
  ) { }

userData = this.localStore.getUser();
date = new FormControl(new Date());
serializedDate = new FormControl(new Date().toISOString());
accountData: any;
currentBalance: any;

/**
* Create an object of instance using the FormGroup
* class to manage the form fields value, controlling and validate them
*/
accountForm: FormGroup = new FormGroup({
sourceAccount: new FormControl(null),
owner2: new FormControl(''),
targetAccount: new FormControl(null),
amount: new FormControl(''),
operator: new FormControl(this.userData.username),
createdAt: new FormControl(this.date),
});

submitted = false;



ngOnInit(): void {

  //Function to validate the form fields according to the specific rules
  this.accountForm = this.formBuilder.group({
    sourceAccount: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+'), Validators.maxLength(20) ] ],
    owner2: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
    targetAccount: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
    //balanceBefore: ['', Validators.required ],
    amount: ['', Validators.required ],
    //balanceAfter: ['', Validators.required ],
    operator: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
    //status: ['', [Validators.required, Validators.minLength(2)] ],
    createdAt: ['', Validators.required ],
  });

  /**
   * Function to catch the event typing from currency field to check the values being typing by user
   * are valid or not.
   * First is removed the all non digit from field, next remove the leading zeros meaning the values might make sense,
   * at the end its neccessary to stop/disable function to emit any event, otherwise its gonna be on the infinity loop.
   * */
  this.accountForm.valueChanges.subscribe( form => {
    if(form.amount){
      this.accountForm.patchValue({
        amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '4.2-2', 'fr')
      }, {emitEvent: false})
    }
  });

  //get router parameter
  this.route.paramMap.subscribe((param) => {
    var id = Number(param.get('id'));

    this.getAccountById(id);

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

  //console.log(JSON.stringify(this.accountForm.value, null, 2))

  if(this.accountForm.value.account === this.accountForm.value.sourceAccount){
    this.snackBarAlert.openSnackBar("The source account must be different from account", "Information", 10, 'bottom', "left")
    //alert("The source account must be different from account")
    return ;
  }

  //this.utils.getUpdateCreditAccount(this.accountForm.value.account, this.accountForm);
  this. creditAccount(this.accountForm);

};


getAccountById(id: number = 0){
  if(id > 0){
    this.accountGetServices.getById(id).subscribe((data: any) => {
        this.accountForm.patchValue({
          sourceAccount: 'Deposit',
          owner2: data.owner,
          targetAccount: data.account,
          operator: this.userData.username
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
   creditAccount(form: FormGroup){

        if(!this.accountData){ this.snackBarAlert.openSnackBar("This account was not found!" , "Information", 10, 'top', "left") }
        else{
          let balance = this.accountData.currentBalance.replaceAll("€","");
          balance = balance.replaceAll(".","");
          balance = balance.replaceAll(",",".");

          let amount = form.value.amount.replaceAll("€","");
          amount = amount.replaceAll(".","");
          amount = amount.replaceAll(",",".");
        
          this.accTransa.creditTransaction(
            form,
            this.accountData,
            form.value.sourceAccount,
            this.accountData.owner,
            this.accountData.currentBalance,
            getFormattedCurrency_deDE(amount),
            getFormattedCurrency_deDE(parseFloat(balance) + parseFloat(amount)),
            "O.Finalized",
            this.datePipe.transform(form.value.createdAt, 'dd/MM/yyyy h:mm:ss')
          );
        }

  }


}
