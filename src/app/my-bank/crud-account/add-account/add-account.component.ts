import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountPostService } from '../service/account-post.service';
import { Router } from '@angular/router';
import { myGlobalVariablesEditAcount } from '../utils/AccountVariables';
import { AddAccountUtils } from '../utils/AddAccountUtils';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
  providers: [CurrencyPipe]
})
export class AddAccountComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.addAccountUtils.getAddFormGroup();

  submitted = false;

  //
  constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
    private accountPostServices: AccountPostService, private router: Router,
    private addAccountUtils: AddAccountUtils) { }


  ngOnInit(): void {
    //Function to validate the form fields according to the specific rules
    this.accountForm = this.formBuilder.group({
      account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
      iban: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$'), Validators.minLength(19), Validators.maxLength(19)]],
      swift: ['', [Validators.required, Validators.pattern('^[A-Z]+$'), Validators.minLength(8), Validators.maxLength(8)] ],
      owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      ownerDoc: ['', [Validators.required, Validators.pattern('^[1-9]+$'), Validators.maxLength(15)] ],
      initialBalance: ['', [Validators.required] ],
      currency: ['', [Validators.required, Validators.minLength(2)] ],
      createdAt: ['', [Validators.required, Validators.maxLength(9)] ],
      isActive: [false, Validators.required],
    });

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



    const { account,
    iban,
    swift,
    owner,
    ownerDoc,
    initialBalance,
    currency,
    createdAt,
    isActive} = this.accountForm.value;


    //console.log(JSON.stringify(this.accountForm.value, null, 2));

    this.accountPostServices.create(account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      initialBalance,
      currency,
      createdAt,
      isActive  === 1 ? true: false).subscribe({
      next: res => {
        console.log(res)

        this.router.navigate(['/dashboard'])
        this.submitted = false;
        this.accountForm.reset();
      },
      error: err => {
        console.log(err)
        //alert("Error: "+err)
      }
    });


  };





}
