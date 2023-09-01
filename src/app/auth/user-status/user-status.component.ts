import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { AuthPostServicesComponent } from '../auth-services/auth-post-service.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  okay = true;
  user: any;

  constructor(private localStore: StorageService,
    private authServices: AuthPostServicesComponent, private currentDate: CurrentDate
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
