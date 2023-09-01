
import { Injectable } from '@angular/core';

//My imports authrntication requests controll
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { GenericServices } from 'src/app/http-settings/generic-services.service';

let model: UserModel = new UserModel();

@Injectable({
  providedIn: 'root'
})

export class AuthGetServicesComponent {

  constructor(private services: GenericServices,
    private authUtils: AuthUtils, private alertD: AlertMessageFactories
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

