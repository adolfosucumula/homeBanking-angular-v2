import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GenericServices } from 'src/app/http-settings/generic-services.service';
import { HttpEndpointSetting } from 'src/app/http-settings/httpEndpointSetting';
import { AccountTransactions } from 'src/app/models/account-transactions.model';


@Injectable({
  providedIn: 'root'
})
export class PostTransactionService {
  constructor(
    private http: HttpClient,
    private base_url: HttpEndpointSetting,
    private genericSvc: GenericServices
    ) { }

  getAll(){
    return this.http.get < AccountTransactions [] > ( this.base_url.endPointURL() + 'debits/')
  }

  create(
    tType: string = '',
    account: string = '',
    owner: string = '',
    balanceBefore: string = '',
    amount: string = '',
    balanceAfter: string = '',
    xAccount: string = '',
    xOwner: string = '',
    operator: string = '',
    status: string = '',
    createdAt: string = '',
  ): Observable <any>{

    var model = new AccountTransactions(
      tType,
      account,
      owner,
      balanceBefore,
      amount,
      balanceAfter,
      xAccount,
      xOwner,
      operator,
      status,
      createdAt,
    );
   return this.genericSvc.create(model, model)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  getById(id: number) {
    return this.http.get < AccountTransactions > ( this.base_url.endPointURL() + `debits/${ id }`)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  getByAccount(account: number) {
    return this.http.get < AccountTransactions > ( this.base_url.endPointURL() + `debits/${ account }`)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

}
