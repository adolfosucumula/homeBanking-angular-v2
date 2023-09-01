
import { Injectable } from '@angular/core';

//My imports authrntication requests controll
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from 'src/app/utils/StorageService.service';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { GenericServices } from 'src/app/endpoint/generic-services.service';

let model: UserModel = new UserModel();

@Injectable({
  providedIn: 'root'
})

export class AuthPostServicesComponent {

  constructor(private localStore: StorageService, private services: GenericServices,
    private authUtils: AuthUtils,
    private alertD: AlertMessageFactories
    ) {}

  signInFormData: FormGroup = this.authUtils.createSigninFormGroup();


  /**
   * This the method that make a post request to log in
   * @param form Group of the form fields
   * @returns
   */
  signIn(username: string, password: string, createdAt: string): Observable <any> {

    model.setTableName("loggeds")
    model.setUsername(username);
    model.setPassword(password);
    model.setCreatedAt(createdAt);

    return this.services.create(model, model)

    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to sign in')
        console.error(err);
        if(err.status == 0){
          this.alertD.openErrorAlertDialog("Error Message", "Server error: "+ err.message, "Ok", '800ms', '500ms')
        }else{
          this.alertD.openErrorAlertDialog("Error Message", err.message + " Status: " + err.status, "Ok", '700ms', '400ms')
        }
        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  /**
   * This the method that make a post request to sign up the user
   * @param form Group of the form fields
   * @returns
   */
  register(
    user: UserModel
  ): Observable <any> {

    user.setTableName("users");

    return this.services.create(user, user)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to sign up')
        console.error(err);
        if(err.status == 0){
          this.alertD.openErrorAlertDialog("Error Message", "Server error: "+ err.message, "Ok", '800ms', '500ms')
        }else{
          this.alertD.openErrorAlertDialog("Error Message", err.message + " Status: " + err.status, "Ok", '700ms', '400ms')
        }
        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  /**
   *
   * @param username String variable to store the user that is sign out
   * @param date String variable to register the date
   * @returns
   */
  logout(username: string, date: string): Observable<any> {
    this.localStore.clearSession();
    this.localStore.saveUser({}, 0);
    this.localStore.isLoggedIn();

    model.setTableName("signout");
    model.setUsername(username);
    model.setCreatedAt(date);
    model.signout = true;

    return this.services.create(model, model)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to log out')
        console.error(err);
        if(err.status == 0){
          this.alertD.openErrorAlertDialog("Error Message", "Server error: "+ err.message, "Ok", '800ms', '500ms')
        }else{
          this.alertD.openErrorAlertDialog("Error Message", err.message + " Status: " + err.status, "Ok", '700ms', '400ms')
        }
        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }



}

