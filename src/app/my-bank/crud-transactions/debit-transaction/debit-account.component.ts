import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditAccountUtils } from '../../crud-account/utils/EditAccountUtils';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountTransactionUtils } from '../../send-money/services/AccountTransactionUtils';
import { AccountGetService } from '../../account/service/account-get.service';
import { getFormattedCurrency_deDE } from 'src/app/utils/functions/formatCurrency';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-debit-account',
  templateUrl: './debit-account.component.html',
  styleUrls: ['./debit-account.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class DebitAccountComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  submitted = false;
  id!:number;


  //
  constructor(private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe
    , private utils: AccountTransactionUtils,
    private router: Router,
    private route: ActivatedRoute,
    private accountGetService: AccountGetService,
    private snackAlert: SnackBarAlertMessage,
    private editAccountUtils: EditAccountUtils,
    private storageLocal: StorageService,
    private datePipe: DatePipe
    ) { }

    userData = this.storageLocal.getUser()

  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.utils.formGroup();
  accountData: FormGroup = this.editAccountUtils.editFormGroup();

    ngOnInit(): void {

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
        if(form.balanceBefore){
          this.accountForm.patchValue({
            balanceBefore: this.currencyPipe.transform(form.balanceBefore.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '4.2-2', 'fr')
          }, {emitEvent: false})
        }
      });

      //get router parameter
      this.route.paramMap.subscribe((param) => {
        this.id = Number(param.get('id'));

        this.getById(this.id);

      });

    };


    //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.accountForm.controls;
    };


    getById(id: number = 0){

      if(id > 0){
        this.accountGetService.getById(id).subscribe((data: any) => {
          this.accountForm.patchValue({
            owner2: data.owner,
            targetAccount: data.account,
            balanceBefore: data.currentBalance,
            amount: '',
            balanceAfter: '',
            operator: this.userData.username,
            status: 'Pendent',
            createdAt: this.datePipe.transform(this.date.value, 'dd/MM/yyyy')
          });

          //Preserve the account register to be used at next step
          this.accountData.patchValue(data);
        })
      }
    };


   /* onSubmit(): void {
      this.submitted = true;

      if(this.accountForm.invalid){
        return;
      }

      let balanceBefore = this.accountForm.value.balanceBefore;
      let amount = this.accountForm.value.amount;
      const account = this.accountForm.value.account;

      balanceBefore = balanceBefore.replaceAll("€","");
      balanceBefore = balanceBefore.replaceAll(",","");
      amount = amount.replaceAll("€","");
      amount = amount.replaceAll(",","");

      //get the ID account from the account list


      if( balanceBefore === 0 || amount === 0){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. ", "Information", 10, 'bottom', "left")
        return;
      }
      if(Number(amount) > Number(balanceBefore) ){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. Am " + (amount - balanceBefore < 0) + " Bf "+ balanceBefore, "Information", 10, 'bottom', "left")
        return;
      }

      var balanceAfter = parseFloat(balanceBefore) - parseFloat(amount);

      /// ====================  Debit on database ====================

        //this.utils.saveTransaction(this.accountForm, '', "€"+balanceBefore.toString(), "€"+balanceAfter.toString(), "O.Finalized");

        //==============  Now update the currency balance form account

        this.getAccount(account, balanceAfter.toString(), this.accountForm);


    };

*/
    /**
     * Compare the value of this parameter with each account from the database to get its ID
     * @param account the account entered in field form
     */
    /*getAccount(account: number = 0, balanceAfter: string, form: FormGroup){ this.snackAlert.openSnackBar("Account"+ account, "Information", 10, 'bottom', "left")
      if(account > 0){
        this.accountGetService.getAll().subscribe((data: any) => {
          const array = JSON.stringify(this.accountGetService.findByAccountInDBList(data, account));
          const items = JSON.parse(array);
          if(items.size == 0){ this.snackAlert.openSnackBar("This account "+ account + " was not found!" , "Information", 10, 'bottom', "left") }
          else{
            this.editAccountUtils.updateAccount(items.id,Number(items.account), items.iban, items.owner, items.swift,
                Number(items.ownerDoc), items.currentBalance, "€"+balanceAfter, items.currency, form);
          }
        })
      }
    }
    */


    onSubmit(): void {
      this.submitted = true;

      if(this.accountForm.invalid){
        return;
      }

      //let balanceBefore = this.accountForm.value.balanceBefore;
      let amount = this.accountForm.value.amount;
      const account = this.accountForm.value.account;
      let balanceBefore = this.accountForm.value.balanceBefore;

      balanceBefore = balanceBefore.replaceAll("€","");
      balanceBefore = balanceBefore.replaceAll(".","");
      balanceBefore = balanceBefore.replaceAll(",",".");
      amount = amount.replaceAll("€","");
      amount = amount.replaceAll(".","");
      amount = amount.replaceAll(",",".");


      //get the ID account from the account list


      if( Number(balanceBefore) === 0 || amount === 0){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. ", "Information", 10, 'bottom', "left")
        return;
      }
      if(Number(amount) > Number(balanceBefore) ){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. Am " +
        (amount - Number(balanceBefore) < 0) + " Bf "+ Number(balanceBefore),
        "Information", 10, 'bottom', "left");
        return;
      }

      var balanceAfter = parseFloat(balanceBefore) - parseFloat(amount);

      /// ====================  Debit on database ====================
     /* this.utils.debitTransaction(
        this.accountForm,
        {
          id: this.id,
          account: this.accountForm.value.account,
          iban: this.accountData.value.iban,
          swift: this.accountData.value.swift,
          owner: this.accountData.value.owner,
          ownerDoc: this.accountData.value.ownerDoc,
          initialBalance: this.accountData.value.initialBalance,
          currency: this.accountData.value.currency,
          isActive: this.accountData.value.isActive
        },
        this.accountForm.value.account,
        this.accountForm.value.owner,
        getFormattedCurrency_deDE(balanceBefore),
        getFormattedCurrency_deDE(amount),
        getFormattedCurrency_deDE(balanceAfter),
        "O.Finalized",
        this.datePipe.transform(this.accountForm.value.createdAt, 'dd/MM/yyyy h:mm:ss')
        );*/

        //==============  Now update the currency balance form account

       // this.creditAccount(userAccountData.account, userAccountData.owner, this.accountForm);

        //this.singInUtil.getUserAccount(this.userData.username)

        this.router.navigate(['/dashboard'])
    };






}

