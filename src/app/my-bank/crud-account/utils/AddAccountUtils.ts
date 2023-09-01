
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { myGlobalVariablesEditAcount } from "./AccountVariables";
import { AccountServicesService } from "../../account/service/account-services.service";


@Injectable({
  providedIn: 'root'
})

export class AddAccountUtils {

  constructor(private accountServices: AccountServicesService, private globalVariable: myGlobalVariablesEditAcount){}

  accountD!: [];
  private exists = false;

  getAddFormGroup (): FormGroup  {
    return new FormGroup({
      account: new FormControl(null),
      iban: new FormControl(''),
      swift: new FormControl(''),
      owner: new FormControl(''),
      ownerDoc: new FormControl(null),
      initialBalance: new FormControl(''),
      currency: new FormControl(''),
      createdAt: new FormControl(''),
      isActive: new FormControl(false),
    });

  }


  /**
   * This method is used to check if the account number typed by user
   * already exit in the database. If true the processo is stoped
   * if false the new register is saved to the database
   */

  getAccount(account: string){
    this.accountServices.getByAccount(account).subscribe({
      next: data => {
        this.accountD = data;
        if(data){
          this.globalVariable.accountExist(false);

        }
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  theAccountExists(account: string): boolean{
    this.getAccount(account);
    return  this.exists;
  }

}
