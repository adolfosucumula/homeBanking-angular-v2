import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditAccountUtils } from '../crud-account/utils/EditAccountUtils';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionUtils } from './services/AccountTransactionUtils';
import { CurrencyPipe } from '@angular/common';
import { AccountGetService } from '../account/service/account-get.service';
import { StorageService } from 'src/app/utils/StorageService.service';
import { getFormattedCurrency_deDE } from 'src/app/utils/functions/formatCurrency';
import { SingInUtil } from 'src/app/auth/utils/signin-util.servicel';

let userAccountData = {account: '000', owner: 'owner', currentBalance: '0,00'}

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss'],
  providers: [CurrencyPipe]
})
export class SendMoneyComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  submitted = false;
  id!:number;
  account?: string = '000000'
  owner1 = ''

  currentBalance: any = '0,00'
  userAccount: [] = []
  userData: any;

  //
  constructor(private localStore: StorageService,
    private currencyPipe: CurrencyPipe,
   private utils: AccountTransactionUtils, private router: Router, private route: ActivatedRoute,
    private accountService: AccountGetService, private snackAlert: SnackBarAlertMessage,
    private editAccountUtils: EditAccountUtils,
    private localStorage: StorageService,
    private singInUtil: SingInUtil
    ) { }


  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.utils.debitFormGroup();
  accountData: FormGroup = this.editAccountUtils.editFormGroup();

    ngOnInit(): void {

      this.userData = this.localStore.getUser();
      this.singInUtil.getUserAccount(this.userData.username)
      userAccountData = this.localStorage.getUserAccount()
      this.account = userAccountData.account
      this.currentBalance = userAccountData.currentBalance,


      //Function to validate the form fields according to the specific rules
      this.accountForm = this.utils.validateForm()

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
        if(form.balanceBefore){
          this.accountForm.patchValue({
            balanceBefore: this.currencyPipe.transform(form.balanceBefore.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
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
        this.accountService.getById(id).subscribe((data: any) => {
          this.accountForm.patchValue({
            owner: data.owner,
            account: data.account,
            balanceBefore: data.currentBalance,
            amount: '',
            balanceAfter: '',
            operator: 'Operator',
            status: 'Pendent',
            createdAt: this.date.value
          });

          //Preserve the account register to be used at next step
          this.accountData.patchValue(data);
        })
      }
    };


    onSubmit(): void {
      this.submitted = true;

      if(this.accountForm.invalid){
        return;
      }

      //let balanceBefore = this.accountForm.value.balanceBefore;
      let amount = this.accountForm.value.amount;
      const account = this.accountForm.value.account;

      let balanceBefore = this.currentBalance?.toString().replaceAll("€","");
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
      this.utils.debitTransaction(
        this.accountForm,
        userAccountData,
        this.account?.toString(),
        userAccountData.owner,
        getFormattedCurrency_deDE(balanceBefore),
        getFormattedCurrency_deDE(amount),
        getFormattedCurrency_deDE(balanceAfter),
        "O.Finalized"
        );

        //==============  Now update the currency balance form account

        this.creditAccount(userAccountData.account, userAccountData.owner, this.accountForm);

        this.singInUtil.getUserAccount(this.userData.username)

        this.router.navigate(['/dashboard'])
    };


    /**
     * Compare the value of this parameter with each account from the database to get its ID
     * @param account the account entered in field form
     */
    creditAccount(sourceAccount: string, owner: string, form: FormGroup){

      if(sourceAccount){
        this.accountService.getByParams('account=' + form.value.targetAccount +
        '&&' +
        'owner=' + form.value.owner2)
        .subscribe((data: any) => {

          if(data.size == 0){ this.snackAlert.openSnackBar("This account "+ sourceAccount + " was not found!" , "Information", 10, 'bottom', "left") }
          else{
            let balance = data[0].currentBalance.toString().replaceAll("€","");
            balance = balance.replaceAll(".","");
            balance = balance.replaceAll(",",".");

            let amount = form.value.amount.replaceAll("€","");
            amount = amount.replaceAll(".","");
            amount = amount.replaceAll(",",".");

            this.utils.creditTransaction(
              form,
            {
              id: data[0].id,
              account: data[0].account,
              iban: data[0].iban,
              swift: data[0].swift,
              owner: data[0].owner,
              ownerDoc: data[0].ownerDoc,
              initialBalance: data[0].initialBalance,
              currency: data[0].currency,
              isActive: data[0].isActive
            },
              this.account?.toString(),
              userAccountData.owner,
              data[0].currentBalance,
              getFormattedCurrency_deDE(amount),
              getFormattedCurrency_deDE(parseFloat(balance) + parseFloat(amount)),
              "O.Finalized"
            );
          }
        })
      }
    }



}
