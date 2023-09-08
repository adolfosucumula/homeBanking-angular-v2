import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const USER_KEY = 'auth-USER';
const LOGGED_KEY = 'auth-OKAY';
const __CREDITS = 'CREDITS';
const _ACCOUNT_USER = 'USER_ACCOUNT'
const _ACCOUNT_BALANCE = 'USER_ACCOUNT_CURRENT_BALANCE'

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor(){}

  /**
   * Method to clear the storage session
   */
  clearSession(): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(LOGGED_KEY);
    window.sessionStorage.removeItem(_ACCOUNT_USER);
    window.sessionStorage.removeItem(_ACCOUNT_BALANCE);
    window.sessionStorage.clear();
  };


  /**
   * This method store the user data to a local variable with key USER_KEY when he logged in
   * @param user
   * @param isLogged accept 1 or 0 as parameter
   */
  saveUser(user: any, isLogged: number): void {
    if( isLogged > 1 || 0 > isLogged )
      console.log(JSON.stringify("Failed to store user data. The login status value is not correct."), null, 1);
    else{
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      window.sessionStorage.setItem(LOGGED_KEY, isLogged.toString());
    }

  };

  /**
   *This method store the account data to a local variable with key _ACCOUNT_USER when he logged in
   * @param account
   */
  saveUserAccount(account: any): void {
      window.sessionStorage.removeItem(_ACCOUNT_USER);
      window.sessionStorage.setItem(_ACCOUNT_USER, JSON.stringify(account));
  };

  //This method get  the user data
  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    //Check if the user is or not empty, e true return a JSON of the user data, if not return an empty list
    if(user) return JSON.parse(user);

    return {};

  };

  //This method get  the account data
  getUserAccount(): any {
    const account = window.sessionStorage.getItem(_ACCOUNT_USER);

    //Check if the account is or not empty, e true return a JSON of the account data, if not return an empty list
    if(account) return JSON.parse(account);

    return {};

  };

  //This method store the status of the user. If logged in return true, otherwise return false
  isLoggedIn(): boolean {
    let ok = window.sessionStorage.getItem(LOGGED_KEY);
    if(Number(ok) && Number(ok) === 1) return true;

    return false;
  };



}



