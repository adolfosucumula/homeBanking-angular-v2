import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountGetService } from '../../account/service/account-get.service';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel.model';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { Router } from '@angular/router';
import { AccountClass } from 'src/app/models/AccountModel.model';
import { GetTransactionsService } from '../../send-money/services/get-transaction.service';
import { FormControl, FormGroup } from '@angular/forms';
import { getFormattedCurrency_deDE } from 'src/app/utils/functions/formatCurrency';
import { SingInUtil } from 'src/app/auth/utils/signin-util.servicel';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {


  totalBalance = '122.200.000,00';
  currenc = [
    {currency: "EUR", icon: "euro_symbol", flag: "../../assets/img/ico/euro.ico"},
    {currency: "USD", icon: "monetization_on", flag: "../../assets/img/ico/dollar.ico"},
    {currency: "AOA", icon: "monetization_on", flag: "../../assets/img/ico/aoa.ico"},
];

  public isLogged = false;
  userData: any;
  userAccount: any ;
  accountCredits!: AccountTransactionModel[];
  accountDebits!: AccountTransactionModel[];
  allAccounts!: AccountClass[];
  dataSource: any;
  dataList: any;
  userAccountData = {account: '000', owner: 'owner', currentBalance: '0,00'}
  formFilter = new FormGroup({
    input: new FormControl('')
  })

  constructor(private localStore: StorageService,
    private singInUtil: SingInUtil,
    private transService: GetTransactionsService,
    private localStorage: StorageService,
    private snackBarAlert: SnackBarAlertMessage,
    private router: Router
    ){ }

  ngOnInit(): void {

    this.userData = this.localStore.getUser();
    this.isLogged = this.localStore.isLoggedIn();

    if(!this.isLogged){
      this.router.navigate(['/signin']);
    }

    this.singInUtil.getUserAccount(this.userData.username)

    this.getTransactions(this.userData.username)

    this.userAccountData = this.localStorage.getUserAccount()


  }


  displayedColumns: string[] = ['id', 'account', 'iban', 'initialBalance', 'amount', 'owner', 'isActive', 'edit'];


  open(){

  }

  filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataList.filter = filterValue.trim().toLowerCase()
  }

  getTransactions(username: string){
    this.transService.getByUser('owner='+username).subscribe((data: AccountTransactionModel) => this.dataList = data);
  };

  formatCurrency(amount: string){
    return getFormattedCurrency_deDE(Number(amount))
  }


}
