import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { AuthUtils } from 'src/app/auth/utils/AuthUtils.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { AuthPostServicesComponent } from '../../auth-services/auth-post-service.service';
import { SessionService } from 'src/app/utils/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SigninServicesService {

  private isLogged: boolean = false;

  constructor(
    private authUtils: AuthUtils, private alertD: AlertMessageFactories,
     private localStore: StorageService,
     private sessionService: SessionService,
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

    saveLoginHistoric(form: FormGroup, userData: any ){

      this.authServices.signIn(
        this.authUtils.getLoginFormData(form).username,
        this.authUtils.getLoginFormData(form).password,
        this.currentDate.getDate()
      ).subscribe((data: any) => {

          this.localStore.saveUser({
            userID: userData.id,
            username: userData.username,
            email: userData.email,
            telephone: userData.telephone,
            role: userData.role,
            createdAt: this.currentDate.getDate(),
            isActive: userData.isActive
          },1);

          this.sessionService.saveSession(data)

          this.isLogged = this.localStore.isLoggedIn();

          if(this.isLogged){
              this.router.navigate(['/balance']);

          }else{
            this.alertD.openErrorAlertDialog("Error", "Logging failed!", "Ok", '700ms', '1000ms')
          }

      })

    }


}
