import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountGetService } from '../../account/service/account-get.service';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { Router } from '@angular/router';
import { AccountClass } from 'src/app/models/AccountModel';
import { GetTransactionsService } from '../../crud-transactions/services/get-transaction.service';

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
  username: any;
  userAccount: any ;
  accountCredits!: AccountTransactionModel[];
  accountDebits!: AccountTransactionModel[];
  allAccounts!: AccountClass[];
  dataSource: any;
  dataList: any;

  constructor(private localStore: StorageService,
    private accountServices: AccountGetService,
    private transService: GetTransactionsService,
    private snackBarAlert: SnackBarAlertMessage, private router: Router
    ){ }

  ngOnInit(): void {
    this.isLogged = this.localStore.isLoggedIn();
  this.username = this.localStore.getUser();
    if(!this.isLogged){
      this.router.navigate(['/login']);
    }

    this.isLogged = this.localStore.isLoggedIn();
    this.username = this.localStore.getUser();
    this.getTransactions()
  }


  displayedColumns: string[] = ['id', 'account', 'iban', 'initialBalance', 'amount', 'owner', 'isActive', 'edit'];


  open(){
    alert("Open")
  }


  getTransactions(){
    this.transService.getAll().subscribe((data: AccountTransactionModel) => {

      this.dataList = data;
        //this.dataSource = new MatTableDataSource(data);

      const array = JSON.stringify(this.accountServices.findByAccountInDBList(data, this.userAccount))
      const items = JSON.parse(array);
      console.log("==================  CREDITS ============================")
      console.log(items)
      if(items.size == 0) { this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left"); }
      else{

      }
    })
  };
  getFormatted(_localLanguage: string = 'pt-PT', _currency: string = 'EUR', value: number): any {

    return new Intl.NumberFormat(_localLanguage, { style: 'currency', currency: _currency }).format(value);
  }

}
