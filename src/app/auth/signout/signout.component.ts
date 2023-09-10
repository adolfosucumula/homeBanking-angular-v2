import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGetServicesComponent } from 'src/app/auth/auth-services/auth-get.service';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SignoutServicesService } from './services/signout-services.service';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/utils/session/session.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  sessao$: Observable<Session | null>;

    constructor(
      private service: SignoutServicesService,
      private sessionService: SessionService
    ){
      this.sessao$ = this.sessionService.getSession();
  }

    okay = true;
    user: any;

    ngOnInit(): void {

    }

    /**
     * Sign out method. First post the data to the database server and then check if the
     * user is logged yet. If false don't do nothing if true redirect to the root page
     */
    signOut(){
      this.sessionService.clearSession()
      this.service.signOut();
    }



}
