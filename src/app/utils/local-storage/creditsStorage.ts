import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AccountTransactionModel } from "src/app/models/AccountTransactionModel";
;
const __CREDITS = 'CREDITS';

@Injectable({
  providedIn: 'root'
})


export class creditsStorage {

  constructor(private router: Router){}

  private credits: any;

  /**
   * Method to clear the storage session
   */
  clearCredits(): void{
    window.sessionStorage.removeItem(__CREDITS);
    //window.sessionStorage.clear();
  };


  /**
   * This method store the user data to a local variable with key USER_KEY when he logged in
   * @param data
   * @param isLogged accept 1 or 0 as parameter
   */
  setCredits(data: any): void {

    if( data.length === 0 )
      console.log(JSON.stringify("Failed to store credits data. The login status value is not correct."), null, 1);
    else{
      window.sessionStorage.removeItem(__CREDITS);
      window.sessionStorage.setItem(__CREDITS, data);
    }

  };

  //This method get  the user data
  geCredits(): any {
    const credits  = window.sessionStorage.getItem(__CREDITS);
    console.log(credits)
    //Check if the credits is or not empty, e true return a JSON of the user data, if not return an empty list
    //if(this.credits.length > 0) return this.credits;

    return {};

  };




}



