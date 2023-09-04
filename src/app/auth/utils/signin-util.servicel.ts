import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthGetServicesComponent } from "../auth-services/auth-get.service";
import { AlertMessageFactories } from "src/app/utils/AlertMessageFactories";
import { SigninServicesService } from "../signin/services/signin-services.service";


@Injectable({
  providedIn: 'root'
})

export class SingInUtil {

  constructor(private router: Router,
      private authServices: AuthGetServicesComponent, private alertD: AlertMessageFactories,
     private  signinService: SigninServicesService
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
          this.signinService.signIn(form, items.username, items.email, items.telephone, items.id, items.role, items.isActive );
        }

      }

    }
  }

}
