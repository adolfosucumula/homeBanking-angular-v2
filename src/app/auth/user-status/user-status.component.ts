import { Component, OnInit } from '@angular/core';
import { SignoutServicesService } from '../signout/services/signout-services.service';
import { Router } from '@angular/router';
import { AuthServicesComponent } from '../auth-services/auth-services.component';
import { StorageService } from 'src/app/utils/StorageService.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  okay = true;
  user: any;

  constructor(private router: Router, private localStore: StorageService,
    private authServices: AuthServicesComponent, private currentDate: CurrentDate
    ){}

  ngOnInit(): void {

    /**
     * Sign out method. First post the data to the database server and then check if the
     * user is logged yet. If false don't do nothing if true redirect to the root page
     */

      this.user = this.localStore.getUser();
      this.authServices.logout(this.user.username, this.currentDate.getDate())
      .subscribe((data: any) => {
        this.okay = this.localStore.isLoggedIn();

      })


  }


}
