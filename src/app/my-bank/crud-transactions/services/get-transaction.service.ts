import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GenericServices } from 'src/app/http-settings/generic-services.service';
import { HttpEndpointSetting } from 'src/app/http-settings/httpEndpointSetting';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {

  trans = new AccountTransactionModel();

  constructor(private http: HttpClient,
    private base_url: HttpEndpointSetting,
    private genericService: GenericServices
    ) { }

  getAll(): Observable <any>{

    //return this.http.get < AccountTransactionModel [] > ( this.base_url.endPointURL() + 'credits/')
    return this.genericService.read(this.trans)
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
    return this.http.get < AccountTransactionModel > ( this.base_url.endPointURL() + `credits/${ id }`)
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
