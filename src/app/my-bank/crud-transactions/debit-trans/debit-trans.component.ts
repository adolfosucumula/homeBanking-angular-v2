import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AccountGetService } from '../../account/service/account-get.service';
import { CurrencyPipe } from '@angular/common';
import { CreditAccountUtils } from '../services/CreditAccountUtils';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-debit-trans',
  templateUrl: './debit-trans.component.html',
  styleUrls: ['./debit-trans.component.scss']
})
export class DebitTransComponent {

  constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
    private accountGetServices: AccountGetService
    , private utils: CreditAccountUtils, private route: ActivatedRoute,
    private snackBarAlert: SnackBarAlertMessage, private localStore: StorageService) { }

  userData = this.localStore.getUser();
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

}
