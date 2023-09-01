
import { Injectable } from '@angular/core';

//My imports authrntication requests controll
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpEndpointSetting } from 'src/app/server/httpEndpointSetting';
import { StorageService } from 'src/app/utils/StorageService.service';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';
import { GenericServices } from '../../services/generic-services.service';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';

let model: UserModel = new UserModel();

@Injectable({
  providedIn: 'root'
})

export class AuthServicesComponent {

  constructor(private localStore: StorageService, private services: GenericServices,
    private authUtils: AuthUtils, private httpReq: HttpEndpointSetting, private http: HttpClient,
    private alertD: AlertMessageFactories
    ) {}

  signInFormData: FormGroup = this.authUtils.createSigninFormGroup();

  /**
   *
   */
  allUsers(): Observable <any>{
    model.setTableName("users")
    return this.services.read(model)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users. '+ err.status)
        if(err.status == 0){
          this.alertD.openErrorAlertDialog("Error Message", "Server error: "+ err.message, "Ok", '800ms', '500ms')
        }else{
          this.alertD.openErrorAlertDialog("Error Message", err.message + " Status: " + err.status, "Ok", '700ms', '400ms')
        }
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

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

  /**
   *
   * @param dataList
   * @param id
   * @returns
   */
  findUserByIdInDBList(dataList: UserModel | any, id: Number): Observable <any> {
    return dataList.find((dataList: {id: Number}) => dataList.id == id );
  }

  /**
   *
   * @param dataList
   * @param username
   * @returns
   */
  findUserByUsernameInDBList(dataList: UserModel | any, username: string): Observable <any> {
    const array = dataList.find((dataList: {username: string}) =>  dataList.username == username );
    console.log(array)
    return array
  }

  /**
   *
   * @param dataList
   * @param username
   * @param password
   * @returns
   */
  compareUsername(dataList: any | any, username: string): boolean {
    const isEqual = dataList.findIndex( (element: {username: string}) =>
    element.username  == username);

    if(isEqual >= 0) return true;
    else return false;
  }

  /**
   *
   * @param dataList
   * @param username
   * @param password
   * @returns
   */
  compareUsernameAndPassword(dataList: any | any, username: string, password: string): boolean {
    const isEqual = dataList.findIndex( (element: {username: string, password: string}) =>
    element.username  == username
    && element.password  == password);

    if(isEqual >= 0) return true;
    else return false;

    //Beste way
    /* A code's name cannot be repeated
      export function codeProductExists (code: string){
        return bk.getAll().some(element => {
          if(element.getCode() == code) return true
          else return false
        })
      }

     */
  }


  /**
   *
   * @param dataList
   * @param email
   * @returns
   */
  findUserByEmailInDBList(dataList: UserModel | any, email: string): Observable <any> {
    return dataList.find((dataList: {email: string}) => dataList.email == email );
  }

}

