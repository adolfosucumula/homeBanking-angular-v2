import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{


  account?: string = ''

  ngOnInit(): void {
    this.account = window.sessionStorage.getItem('USER_ACCOUNT')?.toString();
  }

}
