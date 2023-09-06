import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountPostService } from '../service/account-post.service';
import { Router } from '@angular/router';
import { AddAccountUtils } from '../utils/AddAccountUtils';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
  providers: [CurrencyPipe]
})
export class AddAccountComponent {

  date = new Date();
  serializedDate = new FormControl(new Date().toISOString());
  account = '22222'
  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.addAccountUtils.getAddFormGroup();

  submitted = false;

  //
  constructor( private currencyPipe: CurrencyPipe,
    private addAccountUtils: AddAccountUtils) { }


  ngOnInit(): void {
    this.account = this.addAccountUtils.generateAccount()
    this.accountForm = this.addAccountUtils.validateFormFields()

    /**
     * Function to catch the event typing from currency field to check the values being typing by user
     * are valid or not.
     * First is removed the all non digit from field, next remove the leading zeros meaning the values might make sense,
     * at the end its neccessary to stop/disable function to emit any event, otherwise its gonna be on the infinity loop.
     * */
    this.accountForm.valueChanges.subscribe( form => {
      if(form.initialBalance){
        this.accountForm.patchValue({
          initialBalance: this.currencyPipe.transform(form.initialBalance.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
    });

  };

  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
  get _fC(): {[key: string]: AbstractControl } {
    return this.accountForm.controls;
  };

  onSubmit(): void {
    this.submitted = true;

    if(this.accountForm.invalid){
      return;
    }
    // Check if the account inserted already exists
    const checkAccount = this.addAccountUtils.thisAccountExists(this.accountForm.value.account);
    console.log("The account exists: "+ checkAccount)
    if(checkAccount){
      return
    }

    this.addAccountUtils.addAccount(this.accountForm, this.account)

    this.submitted = false;


  };






}
