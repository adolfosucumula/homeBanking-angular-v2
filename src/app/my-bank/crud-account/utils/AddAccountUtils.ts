
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { myGlobalVariablesEditAcount } from "./AccountVariables";
import { AccountGetService } from "../../account/service/account-get.service";
import { AccountPostService } from "../service/account-post.service";
import { Router } from "@angular/router";

const accountExists = 'THIS_ACCOUNT_EXIS';

@Injectable({
  providedIn: 'root'
})

export class AddAccountUtils {

  date = new Date()

  constructor(private accountServices: AccountGetService,
    private formBuilder: FormBuilder,
    private accountPostServices: AccountPostService,
    private router: Router
    ){}

  accountD!: [];

  getAddFormGroup (): FormGroup  {
    return new FormGroup({

      owner: new FormControl(''),
      ownerDoc: new FormControl(null),
      initialBalance: new FormControl(''),
      currency: new FormControl(''),
      createdAt: new FormControl(''),
      isActive: new FormControl(false),
    });

  }

  validateFormFields(){
    //Function to validate the form fields according to the specific rules
    return this.formBuilder.group({
      owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
      ownerDoc: ['', [Validators.required, Validators.pattern('^[1-9]+$'), Validators.maxLength(15)] ],
      initialBalance: ['', [Validators.required] ],
      currency: ['', [Validators.required, Validators.minLength(2)] ],
      createdAt: ['', [Validators.required, Validators.maxLength(9)] ],
      isActive: [false, Validators.required],
    });


  }


  addAccount(form: FormGroup, account: string){

    const {
      owner,
      ownerDoc,
      initialBalance,
      currency,
      createdAt,
      isActive} = form.value;

      this.accountPostServices.create(
        account,
        owner,
        ownerDoc,
        initialBalance,
        initialBalance,
        currency,
        createdAt,
        isActive  === 1 ? true: false).subscribe((data) =>{
          //this.router.navigate(['/account'])
          form.reset();
        });

  }
  /**
   * This method is used to check if the account number typed by user
   * already exit in the database. If true the processo is stoped
   * if false the new register is saved to the database
   */

  getAccount(account: string){
    this.accountServices.getByAccount(account).subscribe({
      next: data => {
        this.accountD = data;

        if(this.accountServices.thisAccountExists(data, account)){
          window.sessionStorage.setItem(accountExists, '1');
        }else{
          window.sessionStorage.setItem(accountExists, '0')
        }
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  thisAccountExists(account: string): boolean{
    this.getAccount(account);
    if(window.sessionStorage.getItem(accountExists) == '1'){
      return true
    }
    return false
  }

  generateAccount(){

    const min = this.date.getFullYear()
    const max = 90000
    let rand = Math.floor(Math.random() * (max - min) + 100)
    if(rand.toString().length === 5){
      rand = Number(rand.toString().substring(0, rand.toString().length - 1))
    }
    return '002'+ this.date.getMonth() + '' + rand + ''+ this.date.getFullYear() + '' + this.date.getDay()

  }

}
