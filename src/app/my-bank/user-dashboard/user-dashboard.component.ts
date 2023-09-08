import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { CreditAccountUtils } from '../crud-transactions/services/CreditAccountUtils';
import { AccountGetService } from '../account/service/account-get.service';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [CurrencyPipe]
})
export class UserDashboardComponent implements OnInit{


  account?: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private accountGetServices: AccountGetService
    , private utils: CreditAccountUtils,
    private route: ActivatedRoute,
    private snackBarAlert: SnackBarAlertMessage,
    private localStore: StorageService
    ) { }

  //userData = this.localStore.getUser();
  //date = new FormControl(new Date());
  //serializedDate = new FormControl(new Date().toISOString());

  ngOnInit(): void {
    this.account = window.sessionStorage.getItem('USER_ACCOUNT')?.toString();
  }

}
