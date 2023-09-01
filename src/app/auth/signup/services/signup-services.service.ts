import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpUtilsService } from './utils.service';
import { AuthPostServicesComponent } from '../../auth-services/auth-post-service.service';

@Injectable({
  providedIn: 'root'
})
export class SignupServicesService {

  constructor(private authServices: AuthPostServicesComponent, private utils: SignUpUtilsService, private router: Router) { }

  /**
   *
   * @param formData
   */
  saveUser(formData: FormGroup){

    this.authServices.register(
      this.utils.getUserObject(formData)
    )
    .subscribe((data: any)=> {
      this.router.navigate(['/login']);
    })

  }



  /**
   *
   * @param dataList
   * @param username
   * @returns
   */
  thisUserExist(dataList: any | any, username: string): boolean {
    const isEqual = dataList.findIndex( (element: {username: string}) =>
    element.username  == username);

    if(isEqual >= 0) return true;
    else return false;
  }

 /**
   *
   * @param dataList
   * @param email
   * @returns
   */
 thisEmailExist(dataList: any | any, email: string): boolean {
  const isEqual = dataList.findIndex( (element: {email: string}) =>
  element.email  == email);

  if(isEqual >= 0) return true;
  else return false;
}

/**
   *
   * @param dataList
   * @param telephone
   * @returns
   */
thisTelephoneExist(dataList: any | any, telephone: string): boolean {
  const isEqual = dataList.findIndex( (element: {telephone: string}) =>
  element.telephone  == telephone);

  if(isEqual >= 0) return true;
  else return false;
}


}
