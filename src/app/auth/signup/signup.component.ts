import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { SignUpUtilsService } from './services/utils.service';
import { AuthGetServicesComponent } from '../auth-services/auth-get.service';
import { UserModel } from 'src/app/models/UserModel';
import { SignupServicesService } from './services/signup-services.service';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private utils: SignUpUtilsService,
    private localStore: StorageService,
    private signUpService: SignupServicesService,
    private router: Router, private authServices: AuthGetServicesComponent,
    private alertD: AlertMessageFactories,
    private currentDate: CurrentDate
   ){}

  submitted = false;
  isLogged = false;
  hide = true;
  erroMessage = "";

  entityForm: FormGroup = this.utils.createSignupFormGroup();

  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


    ngOnInit(): void {

      this.entityForm = this.utils.validateFieldGroup();

      if(this.localStore.isLoggedIn()){
        this.router.navigate(['/']);
      }
    };

    /**
       * Method to sig in to the user.
       * The
       * @returns
       */
    onSubmit(): void {
      this.submitted = true;

      if(this.entityForm.invalid){
        return;
      }
      /**
       * First list all the user in database to check the user already exist
       * by comparing the username and the email
       */
      this.authServices.allUsers().subscribe((data: UserModel) => {

          if(this.signUpService.thisUserExist(data, this.entityForm.value.username.toLowerCase())){

            this.alertD.openErrorAlertDialog("Warning", "This username already exist.", "Ok", '700ms', '1000ms')

          }else if(this.signUpService.thisEmailExist(data, this.entityForm.value.email.toLowerCase())){

            this.alertD.openErrorAlertDialog("Warning", "This email already exist.", "Ok", '700ms', '1000ms')

          }else if(this.signUpService.thisTelephoneExist(data, this.entityForm.value.telephone)){

            this.alertD.openErrorAlertDialog("Warning", "This telephone was already registed.", "Ok", '700ms', '1000ms')

          }else{
            this.erroMessage = "";
              this.signUpService.saveUser(this.entityForm);
          }

      })

    };


}
