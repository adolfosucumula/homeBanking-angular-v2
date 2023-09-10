import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditAccountUtils } from '../crud-account/utils/EditAccountUtils';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionUtils } from './services/AccountTransactionUtils';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountGetService } from '../account/service/account-get.service';
import { StorageService } from 'src/app/utils/StorageService.service';
import { getFormattedCurrency_deDE } from 'src/app/utils/functions/formatCurrency';
import { SingInUtil } from 'src/app/auth/utils/signin-util.servicel';
import { formatDateWithPipe, getSystemPipeTime } from 'src/app/utils/functions/system-timestamp';
import { patchDataToForm } from './services/patch-data-to-form';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';

let userAccountData = {account: '000', owner: 'owner', currentBalance: '0,00'}

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class SendMoneyComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  submitted = false;
  account?: string = '000000'
  barWidth = 0;
  progress = 0
  showPBar1 = false
  currentBalance: any = '0,00'
  userAccount: [] = []
  userData: any;

  //
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  ///

  //
  constructor(private localStore: StorageService,
    private currencyPipe: CurrencyPipe,
   private accTransa: AccountTransactionUtils,
   private router: Router,
   private route: ActivatedRoute,
    private accountService: AccountGetService,
    private snackBarAlert: SnackBarAlertMessage,
    private editAccountUtils: EditAccountUtils,
    private localStorage: StorageService,
    private singInUtil: SingInUtil
    ) { }


  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.accTransa.formGroup();
  accountData: FormGroup = this.editAccountUtils.editFormGroup();

    ngOnInit(): void {

      this.userData = this.localStore.getUser();
      this.singInUtil.getUserAccount(this.userData.username)
      userAccountData = this.localStorage.getUserAccount()
      this.account = userAccountData.account
      this.currentBalance = userAccountData.currentBalance,
      this.patchDataToForm()

      /*setTimeout(()=>{
        let intervalID = setInterval(()=>{
          if(this.barWidth == 100){
            clearInterval(intervalID);
          }else{
            this.animate()
          }
        }, 100)
      }, 2000)*/
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

      let balanceBefore = this.accountForm.value.balanceBefore;
      let amount = this.accountForm.value.amount;

      let tType = this.accountForm.value.tType;

      if(!amount || amount ===0){ return }
      else if(!balanceBefore || balanceBefore ===0){
        this.snackBarAlert.openSnackBar("Insufficient funds to continue the operation.",
            "Information", 10, 'bottom', "left");
         return
      }

      if(tType === 'Debit'){

        this.registOperation(this.accountForm, userAccountData, tType);

        tType = 'Credit'
      }

      this.sleep(2000).then(()=>{

        if(tType === 'Credit'){

          this.accountService.getByParams('account=' + this.accountForm.value.xAccount +
          '&&' +
          'owner=' + this.accountForm.value.xOwner)
          .subscribe((data: any)=>{

            this.accountForm.patchValue({
              tType: tType,
              account: data[0].account,
              owner: data[0].owner,
              balanceBefore: data[0].currentBalance,
              amount: this.accountForm.value.amount,
              xAccount: userAccountData.account,
              xOwner: userAccountData.owner,
              operator: this.userData.username,
              status: 'Finished',
              createdAt: this.accountForm.value.createdAt
            })

            this.showPBar1 = false

            this.registOperation(this.accountForm, data[0], tType);

          });
        }

        this.router.navigate(['/dashboard'])

      })

    };

    patchDataToForm(){

      patchDataToForm(
        this.accountForm,
        'Debit',
        userAccountData.account,
        userAccountData.owner,
        userAccountData.currentBalance,
        '',
        '',
        '',
        this.userData.username,
        'Finished',
        ''
      )
    }


    /**
     * Compare the value of this parameter with each account from the database to get its ID
     * @param account the account entered in field form
     */
    registOperation(form: FormGroup, accountData: any, transactionType: string){

      if(!accountData){ this.snackBarAlert.openSnackBar("This account was not found!" , "Information", 10, 'top', "left") }
      else{

        let balanceBefore = this.accountForm.value.balanceBefore;

        let amount = form.value.amount;

        let finalBalance = 0;

        if(transactionType && (transactionType === 'Deposit' || transactionType === 'Credit')){

          finalBalance = parseFloat(balanceBefore) + parseFloat(amount);
        }
        else if(transactionType && transactionType === 'Debit'){

          if(Number(amount) > Number(balanceBefore) ){
            this.snackBarAlert.openSnackBar("Insufficient funds to continue the operation. Am " +
            (amount - Number(balanceBefore) < 0) + " Bf "+ Number(balanceBefore),
            "Information", 10, 'bottom', "left");
            return;
          }

          finalBalance = parseFloat(balanceBefore) - parseFloat(amount);
        }

        this.accTransa.registTransaction(
          form,
          accountData,
          amount,
          finalBalance.toString(),
          formatDateWithPipe(form.value.createdAt) + ' ' + getSystemPipeTime()
        );



      }

    }

    sleep(ms: number){ this.showPBar1 = true
      return new Promise(res => setTimeout(res, ms));
    }


    animate(){
      this.barWidth ++;
      this.value = this.barWidth
      this.progress = this.barWidth
      setTimeout(()=>{

      }, 1000)
    }



}
