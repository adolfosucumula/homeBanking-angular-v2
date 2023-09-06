import { Injectable } from '@angular/core';
import { AccountClass } from 'src/app/models/AccountModel';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/utils/handle-error';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { GenericServices } from 'src/app/http-settings/generic-services.service';

let model: AccountClass = new AccountClass();

@Injectable({
  providedIn: 'root'
})
export class AccountGetService {

  constructor(
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


  getById(id: number){
    model.setTableName("accounts")
    return this.services.find(model, id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError(handleError) // then handle the error
    );
  }

  getByAccount(account: string): Observable<any> {
    model.setTableName("accounts")
    return this.services.find(model, account)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError(handleError) // then handle the error
    );
  }

  getByOwner(owner: string): Observable<any> {

    return this.services.findObjts("accounts?owner=" + owner )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError(handleError) // then handle the error
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

/**
   *
   * @param dataList
   * @param account
   * @param password
   * @returns
   */
  thisAccountExists(dataList: any | any, account: string): boolean {
  const isEqual = dataList.findIndex( (element: {account: string}) =>
  element.account  == account);

  if(isEqual >= 0) return true;
  else return false;
}


}
