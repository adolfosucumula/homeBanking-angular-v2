import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { AuthServicesComponent } from 'src/app/auth/auth-services/auth-services.component';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { SigninServicesService } from './services/signin-services.service';

let user = new UserModel();

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {


  constructor(private authUtils: AuthUtils,
     private localStore: StorageService,private formBuilder: FormBuilder,
     private router: Router, private authServices: AuthServicesComponent, private alertD: AlertMessageFactories,
     private  signinService: SigninServicesService
    ){}

  submitted = false;
  isLogged = false;
  hide = true;
  entityForm: FormGroup = this.authUtils.createSigninFormGroup();

   //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


  ngOnInit(): void {

    //Function to validate the form fields according to the specific rules
    this.entityForm = this.authUtils.validateForm();

    if(this.localStore.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  /**
   * Method to sig in to the system.
   * The
   * @returns
   */
  onSubmit(): void {
    this.submitted = true;

    if(this.entityForm.invalid){
      return;
    }

    this.firstFindUser();

  };

  /**
   * Firt load all  the user from JSON server and find the user that want to sign In, if found compare their password
   *, if equals, a register of login is created on JSON server and the user is  redirected to  the dashboard
   */
  firstFindUser(){

    // Load all user from JSON SERVER
    this.authServices.allUsers().subscribe((data: any) => {

      // Find user from database list
      const exists = this.authServices.compareUsername(data, this.entityForm.value.username);

      if(!exists){
        this.alertD.openErrorAlertDialog("Warning", "User not found.", "Ok", '700ms', '1000ms')
      }else{

        const exists = this.authServices.compareUsernameAndPassword(data, this.entityForm.value.username, this.entityForm.value.password);
        if(!exists){
          this.alertD.openErrorAlertDialog("Warning", "Password wrong.", "Ok", '700ms', '1000ms')
        }else{

          const array = JSON.stringify(this.authServices.findUserByUsernameInDBList(data, this.entityForm.value.username));
          const items = JSON.parse(array);

          // Register login history
          if(!items.isActive){
            this.router.navigate(['/user-inactive']);
          }
          else{
            this.signinService.signIn(this.entityForm, items.username, items.email, items.telephone, items.id, items.role, items.isActive );
          }

        }

      }

    })
  };


}




