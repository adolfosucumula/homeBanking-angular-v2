import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { AuthPostServicesComponent } from '../../auth-services/auth-post-service.service';

@Injectable({
  providedIn: 'root'
})
export class SigninServicesService {

  private isLogged: boolean = false;

  constructor(
    private authUtils: AuthUtils, private alertD: AlertMessageFactories,
     private localStore: StorageService,
     private router: Router, private authServices: AuthPostServicesComponent,
     private currentDate: CurrentDate
    ) {}


    /**
     *
     * @param form
     * @param username
     * @param email
     * @param telephone
     * @param userID
     * @param userRole
     * @param isActive
     */

    signIn(form: FormGroup, username: string, email: string, telephone: number, userID: number, userRole: string, isActive: boolean ){

      this.authServices.signIn(
        this.authUtils.getLoginFormData(form).username,
        this.authUtils.getLoginFormData(form).password,
        this.currentDate.getDate()
      ).subscribe((data: any) => {

          this.localStore.saveUser({
            userID: userID,
            username: username,
            email: email,
            telephone: telephone,
            role: userRole,
            createdAt: this.currentDate.getDate(),
            isActive: isActive
          },1);
          this.isLogged = this.localStore.isLoggedIn();
          if(this.isLogged){
              this.router.navigate(['/balance']);

          }else{
            this.alertD.openErrorAlertDialog("Error", "Logging failed!", "Ok", '700ms', '1000ms')
          }

      })

    }


}
