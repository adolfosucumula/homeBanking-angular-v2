import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountClass } from 'src/app/models/AccountModel';
import { HttpEndpointSetting } from 'src/app/endpoint/httpEndpointSetting';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/utils/handle-error';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { GenericServices } from 'src/app/endpoint/generic-services.service';

let model: AccountClass = new AccountClass();

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient, private baseUrl: HttpEndpointSetting,
    private services: GenericServices,
    private alertD: AlertMessageFactories
    ) { }

  getAll(){
     model.setTableName("accounts")
     return this.services.read(model)
     .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError(handleError) // then handle the error
    );
  }

  filter(filter: string = '', datalist: AccountClass[]){
    let result: AccountClass[] = [];
    console.log(datalist)
    if(filter)
    {
      result = datalist.filter((item) => {
        return item.account == filter
      })
      //result = datalist.find((datalist: {account: string}) => datalist.account == filter)
      if(result.length == 0) return datalist
    }
    else
      result = datalist;
    return result;
  }

  create(
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{
    model.account = account.toString();
    model.iban = iban;
    model.swift = swift;
    model.owner = owner;
    model.ownerDoc = ownerDoc.toString();
    model.initialBalance = initialBalance;
    model.currentBalance = currentBalance;
    model.currency = currency;
    model.createdAt = createdAt;
    model.isActive = isActive;

    model.setTableName("accounts")
    return this.services.create(model, model)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      retry(3), // retry a failed request up to 3 times
      catchError(handleError) // then handle the error
    );
  }

  getById(id: number){
    model.setTableName("accounts")
    return this.services.find(model, id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      retry(3), // retry a failed request up to 3 times
      catchError(handleError) // then handle the error
    );
  }

  getByAccount(account: string): Observable<any> {
    model.setTableName("accounts")
    return this.services.find(model, account)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      retry(3), // retry a failed request up to 3 times
      catchError(handleError) // then handle the error
    );
  }


  update(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{
      model.account = account.toString();
      model.iban = iban;
      model.swift = swift;
      model.owner = owner;
      model.ownerDoc = ownerDoc.toString();
      model.initialBalance = initialBalance;
      model.currentBalance = currentBalance;
      model.currency = currency;
      model.createdAt = createdAt;
      model.isActive = isActive;
      model.setTableName("accounts")

    return this.services.update(model, id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        this.alertD.openErrorAlertDialog('Error Alert', "Error when try to update account. (STATUS = "+ err.status + ")", 'Close')
        console.log('error caught in service. When try to update account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  updateBalance(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
    ): Observable <any>{
      model.account = account.toString();
      model.iban = iban;
      model.swift = swift;
      model.owner = owner;
      model.ownerDoc = ownerDoc.toString();
      model.initialBalance = initialBalance;
      model.currentBalance = currentBalance;
      model.currency = currency;
      model.createdAt = createdAt;
      model.isActive = isActive;
      model.setTableName("accounts")
    return this.services.update(model, id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When try to update account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  delete(id: number){
    model.setTableName("accounts")
    return this.services.delete(model, id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When try to delete account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }


   /**
   *
   * @param dataList is the data list got from the database list
   * @param item is the account number to be found of
   * @returns
   */
   findByAccountInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { account: string }) => dataList.account == item);
  }

  /**
   *
   * @param dataList is the data list got from the database list
   * @param item the iban reference to be found of
   * @returns
   */
  findByIbanInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { iban: string }) => dataList.iban == item);
  }

  /**
   *
   * @param dataList is the data list got from the database list
   * @param item is the owner document to be found by
   * @returns
   */
  findByOwnerDocInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { ownerDoc: string }) => dataList.ownerDoc == item);
  }



}
