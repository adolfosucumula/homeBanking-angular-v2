import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from 'src/app/utils/Utils';
import { AccountGetService } from './service/account-get.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountClass } from 'src/app/models/AccountModel.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

   //Get shared data from parent component
   @Input() message?: string;

   //Creating a list/array list instance of the accounts to store all accounts comes from the server
    allAccounts!: AccountClass[];
    errorMessage?: string;
    calledChildren = false;
    dataSource: any;
    date = new Date();

    formFilter = new FormGroup({
      input: new FormControl('')
    })

   //creating an instance of the account services that provide the crud methods and so on.
   constructor( private accountServices: AccountGetService, private route: ActivatedRoute, private router: Router,
     public dialog: MatDialog,
     ){ }

    ngOnInit(): void {


     this.getAll();

      this.route.paramMap.subscribe( ( param ) => {
       var id = Number(param.get('id'));
       //this.removeAccount(id);
      })

    };

    /**
   *
   */


  filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


   //Method that returns all accounts from database server
   getAll(){
     this.accountServices.getAll().subscribe((data: any) => {
       this.allAccounts = data;
       this.dataSource = new MatTableDataSource(this.allAccounts);
     });
   }

   displayedColumns: string[] = ['id', 'account', 'initialBalance', 'amount', 'owner', 'isActive', 'edit'];
   //dataSource = ELEMENT_DATA;

   /**
    * Method to remove account from database server
    * @param id
    */
   removeAccount(id: number): void {
     this.accountServices.delete(id).subscribe({
       next: res => {
         this.getAll();
       },
       error: err => {
         if (err.error) {
           this.errorMessage = JSON.parse(err.error).message;
         } else {

           this.errorMessage = "Error with status: " + err.status;
         }
       }
     })
   };



   accountAdd(){
     this.router.navigate(['/add-account/']);
   }

   accountEdit(id: number){
     this.router.navigate(['/edit/account/',id]);
   }

   accountCredit(id: number){
     this.router.navigate(['/credit/account/',id]);
   }

   accountDebit(id: number){
     this.router.navigate(['/debit/account/',id]);
   }



}
