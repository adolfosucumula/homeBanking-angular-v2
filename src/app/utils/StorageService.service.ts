import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const USER_KEY = 'auth-USER';
const LOGGED_KEY = 'auth-OKAY';
const __CREDITS = 'CREDITS';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor(private router: Router){}

  /**
   * Method to clear the storage session
   */
  clearSession(): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(LOGGED_KEY);
    window.sessionStorage.removeItem('USER_ACCOUNT');
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

  //This method get  the user data
  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    //Check if the user is or not empty, e true return a JSON of the user data, if not return an empty list
    if(user) return JSON.parse(user);

    return {};

  };

  //This method store the status of the user. If logged in return true, otherwise return false
  isLoggedIn(): boolean {
    let ok = window.sessionStorage.getItem(LOGGED_KEY);
    if(Number(ok) && Number(ok) === 1) return true;

    return false;
  };



}



