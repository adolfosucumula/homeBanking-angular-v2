import { Injectable, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpUtilsService } from './utils.service';
import { AuthPostServicesComponent } from '../../auth-services/auth-post-service.service';
import { AddAccountUtils } from 'src/app/my-bank/crud-account/utils/AddAccountUtils';
import { AccountPostService } from 'src/app/my-bank/crud-account/service/account-post.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';

@Injectable({
  providedIn: 'root'
})
export class SignupServicesService {

  constructor(
    private authServices: AuthPostServicesComponent,
    private utils: SignUpUtilsService,
    private router: Router,
    private addAccountUtils: AddAccountUtils,
    private postAccount: AccountPostService,
    private date: CurrentDate
    ) { }

  /**
   *
   * @param formData
   */
  saveUser(formData: FormGroup){
    this.addAccountUtils.generateAccount()
    this.authServices.register(this.utils.getUserObject(formData))
    .subscribe((data: any)=>
    this.addAccountUtils.addAccount(
      new FormGroup({
        owner: new FormControl(formData.value.username),
        ownerDoc: new FormControl(formData.value.telephone),
        initialBalance: new FormControl('0,00'),
        currency: new FormControl('EUR'),
        createdAt: new FormControl(this.date.getDate()),
        isActive: new FormControl(false),
      }),
      this.addAccountUtils.generateAccount()
      )
    )

    this.router.navigate(['/signin'])

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
