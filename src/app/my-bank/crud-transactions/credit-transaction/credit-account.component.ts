import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { CreditAccountUtils } from '../services/CreditAccountUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { AccountPostService } from '../../crud-account/service/account-post.service';
import { AccountGetService } from '../../account/service/account-get.service';

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.scss']
})
export class CreditAccountComponent {
//
constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
  private accountGetServices: AccountGetService
  , private utils: CreditAccountUtils, private route: ActivatedRoute,
  private snackBarAlert: SnackBarAlertMessage, private localStore: StorageService) { }

userData = this.localStore.getUser();
date = new FormControl(new Date());
serializedDate = new FormControl(new Date().toISOString());


/**
* Create an object of instance using the FormGroup
* class to manage the form fields value, controlling and validate them
*/
accountForm: FormGroup = new FormGroup({
sourceAccount: new FormControl(null),
owner: new FormControl(''),
account: new FormControl(null),
amount: new FormControl(''),
operator: new FormControl(this.userData.username),
createdAt: new FormControl(this.date),
});

submitted = false;



ngOnInit(): void {

  //Function to validate the form fields according to the specific rules
  this.accountForm = this.formBuilder.group({
    sourceAccount: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
    owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
    account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
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
        amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
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

  this.utils.getUpdateCreditAccount(this.accountForm.value.account, this.accountForm);


};


getAccountById(id: number = 0){
  if(id > 0){
    this.accountGetServices.getById(id).subscribe((data: any) => {
      this.accountForm.patchValue(data);
    })
  }
}

}
