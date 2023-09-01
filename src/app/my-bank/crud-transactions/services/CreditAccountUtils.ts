
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SnackBarAlertMessage } from "src/app/utils/snackBarAlertMessage";
import { AccountGetService } from "../../account/service/account-get.service";
import { CreditServicesService } from "./credit-services.service";
import { EditAccountUtils } from "../../crud-account/utils/EditAccountUtils";


@Injectable({
  providedIn: 'root'
})

export class CreditAccountUtils {

  constructor(private accountService: AccountGetService, private creditServices: CreditServicesService,
    private editAcUtils: EditAccountUtils, private snackBarAlert: SnackBarAlertMessage
    ) {}

  acc: any = '';
  balance = "";

  creditFormGroup (): FormGroup  {
    return new FormGroup({
      sourceAccount: new FormControl(null),
      owner: new FormControl(''),
      account: new FormControl(null),
      balanceBefore: new FormControl(''),
      amount: new FormControl(''),
      balanceAfter: new FormControl(''),
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
      sourceAccount,
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    } = form.value;

    return {
      sourceAccount,
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    };
  };


  getUpdateCreditAccount(account: number, form: FormGroup){

    this.accountService.getAll().subscribe((data: any) => {
      //console.log(JSON.stringify(data, null, 2))

        /**
         * Load all accounts from database
         * and compare them to the account from form
         * if equals get this balance account and sum with the
         * amount to be credited
         * */

        const array = JSON.stringify(this.accountService.findByAccountInDBList(data, account));
        const items = JSON.parse(array);
        if(items.size == 0){ this.snackBarAlert.openSnackBar("Account was not found", "Information", 10, 'bottom', "left") }
        else{
          this.acc = items.account;
            //this.balance = data[index].currentBalance;
            var bala = items.currentBalance.replaceAll("€","");
            bala = bala.replaceAll(",","");
            var amoun = form.value.amount.replaceAll("€","");
            amoun = amoun.replaceAll(",","");
            var currentBalance = parseFloat(bala) + parseFloat(amoun);

            currentBalance.toString(), items.createdAt

            // First update the account current balance  and next save
            // Credit register to the database server
            this.editAcUtils.updateAccountBalance(items.id,
              Number(account),
              items.iban,
              items.swift,
              items.owner,
              items.ownerDoc,
              items.initialBalance,
              "€" + currentBalance.toString(),
              items.currency,
              items.createdAt,
              form.value.createdAt,
              items.isActive
              );

              this.creditAccount(form, items.currentBalance,
                "€" + currentBalance.toString(), "finalized");
        }

    })
  };

  creditAccount(form: FormGroup, balanceBefore: string,
    balanceAfter: string, status: string
    ){
    this.creditServices.create(
        this.getFormData(form).sourceAccount,
        this.getFormData(form).owner,
        this.getFormData(form).account,
        balanceBefore,
        this.getFormData(form).amount,
        balanceAfter,
        this.getFormData(form).operator,
        status,
        this.getFormData(form).createdAt,
      ).subscribe({
        next: data => {
          //console.log("========= Success to credit account! =============")
          console.log(JSON.stringify(data, null, 2))
        },
        error: err => {
          //console.log("========= Failed to credit account! =============")
          console.log(JSON.stringify(err, null, 2))
        }
    })
  }



}
