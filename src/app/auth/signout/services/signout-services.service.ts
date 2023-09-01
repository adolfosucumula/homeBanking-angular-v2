import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { AuthPostServicesComponent } from '../../auth-services/auth-post-service.service';

@Injectable({
  providedIn: 'root'
})
export class SignoutServicesService {

  okay = true;
  user: any;

  constructor(private router: Router, private localStore: StorageService,
    private authServices: AuthPostServicesComponent, private currentDate: CurrentDate
    ){}

  /**
     * Sign out method. First post the data to the database server and then check if the
     * user is logged yet. If false don't do nothing if true redirect to the root page
     */
  signOut(){
    this.user = this.localStore.getUser();
    this.authServices.logout(this.user.username, this.currentDate.getDate())
    .subscribe((data: any) => {
      this.okay = this.localStore.isLoggedIn();

        if(!this.okay){
          this.router.navigate(['/']);
        }
    })


  }
}
