import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpEndpointSetting } from 'src/app/endpoint/httpEndpointSetting';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';

@Injectable({
  providedIn: 'root'
})
export class DebitServicesService {
  constructor(private http: HttpClient, private base_url: HttpEndpointSetting) { }

  getAll(){
    return this.http.get < AccountTransactionModel [] > ( this.base_url.endPointURL() + 'debits/')
  }

  create(
    owner: string,
    account: string,
    balanceBefore: string,
    amount: string,
    balanceAfter: string,
    operator: string,
    status: string,
    createdAt: string
  ): Observable <any>{
    return this.http.post < AccountTransactionModel > ( this.base_url.endPointURL() + 'debits', {
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    } )
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
    return this.http.get < AccountTransactionModel > ( this.base_url.endPointURL() + `debits/${ id }`)
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
    return this.http.get < AccountTransactionModel > ( this.base_url.endPointURL() + `debits/${ account }`)
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
