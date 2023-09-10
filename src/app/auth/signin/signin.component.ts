import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel.model';
import { AuthGetServicesComponent } from 'src/app/auth/auth-services/auth-get.service';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { SigninServicesService } from './services/signin-services.service';
import { SingInUtil } from '../utils/signin-util.servicel';

let user = new UserModel();

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  fullWidth = 0;

  constructor(private authUtils: AuthUtils, private signIn: SingInUtil,
     private localStore: StorageService,
     private router: Router, private authServices: AuthGetServicesComponent,
     private alertD: AlertMessageFactories
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
      this.router.navigate(['/dashboard']);
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
    this.authServices.findUser('username=' + this.entityForm.value.username ).subscribe(
      (data) => this.signIn.makeLogin(data, this.entityForm)
      );

  };




}




