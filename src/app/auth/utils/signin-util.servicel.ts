import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthGetServicesComponent } from "../auth-services/auth-get.service";
import { AlertMessageFactories } from "src/app/utils/AlertMessageFactories";
import { SigninServicesService } from "../signin/services/signin-services.service";
import { AccountGetService } from "src/app/my-bank/account/service/account-get.service";
import { StorageService } from "src/app/utils/StorageService.service";


@Injectable({
  providedIn: 'root'
})

export class SingInUtil {

  constructor(private router: Router,
      private authServices: AuthGetServicesComponent,
      private alertD: AlertMessageFactories,
     private  signinService: SigninServicesService,
     private accountService: AccountGetService,
     private localStorage: StorageService
    ){}

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  /**
   * Firt load all  the user from JSON server and find the user that want to sign In, if found compare their password,
   * if equals, a register of login is created on JSON server and the user is  redirected to  the dashboard
   * @param data
   * @param form
   */
  makeLogin(data: any, form: FormGroup){

    // Find user from database list
    const exists = this.authServices.compareUsername(data, form.value.username);

    if(!exists){
      this.alertD.openErrorAlertDialog("Warning", "User not found.", "Ok", '700ms', '1000ms')
    }else{

      const exists = this.authServices.compareUsernameAndPassword(data, form.value.username, form.value.password);
      if(!exists){
        this.alertD.openErrorAlertDialog("Warning", "Password wrong.", "Ok", '700ms', '1000ms')
      }else{

        const array = JSON.stringify(this.authServices.findUserByUsernameInDBList(data, form.value.username));
        const items = JSON.parse(array);

        // Register login history
        if(!items.isActive){
          this.router.navigate(['/user-inactive']);
        }
        else{
          this.getUserAccount(items.username);
          this.signinService.signIn(form, items.username, items.email, items.telephone, items.id, items.role, items.isActive );
        }

      }

    }
  }


  getUserAccount(user: string){

    this.accountService.getByParams('owner=' +user).subscribe((data: any) => {
      this.localStorage.saveUserAccount({
        id: data[0].id,
        account: data[0].account,
        iban: data[0].iban,
        swift: data[0].swift,
        owner: data[0].owner,
        ownerDoc: data[0].ownerDoc,
        initialBalance: data[0].initialBalance,
        currentBalance: data[0].currentBalance,
        currency: data[0].currency,
        createdAt: data[0].createdAt,
        isActive: data[0].isActive
      })
    })
  }


}
