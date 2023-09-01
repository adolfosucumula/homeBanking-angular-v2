
export const globalVariablesAddAcount = {
  accountID: 0,
  accountStatus: false,
  accountExists: false,
  accountList: {},
}



export const globalVariablesEditAcount = {
  accountID: 0,
  accountStatus: false,
}


import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class myGlobalVariablesEditAcount {

  public isInLoginPage!: boolean;
  public accountExists!: boolean;

  userLogin(value: boolean){
    this.isInLoginPage = value;

  }

  accountExist(value: boolean){
    this.accountExists = value;
    return this.accountExists;
  }

}
