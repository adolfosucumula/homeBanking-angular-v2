import { Injectable } from '@angular/core';
import { AccountClass } from 'src/app/models/AccountModel';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/utils/handle-error';

import { GenericServices } from 'src/app/endpoint/generic-services.service';

let model: AccountClass = new AccountClass();

@Injectable({
  providedIn: 'root'
})
export class AccountPostService {

  constructor(
    private services: GenericServices,
    ) { }


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





}
