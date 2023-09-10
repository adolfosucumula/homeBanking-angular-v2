import { Injectable } from '@angular/core';
import { AccountClass } from 'src/app/models/AccountModel.model';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
import { GenericServices } from 'src/app/http-settings/generic-services.service';

let model: AccountClass = new AccountClass();

@Injectable({
  providedIn: 'root'
})
export class AccountUpdateService {

  constructor(
    private services: GenericServices,
    private alertD: AlertMessageFactories
    ) { }



  update(
    id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
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
        this.alertD.openErrorAlertDialog('Error Alert', "Error when try to update account. (STATUS = "+ err.status + ")", 'Close')
        console.log('error caught in service. When try to update account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  updateBalance(
    id: number,
    account: number,
    owner: string,
    ownerDoc: number,
    currentBalance: string,
    createdAt: string
    ): Observable <any>{
      model.currentBalance = currentBalance;
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



}
