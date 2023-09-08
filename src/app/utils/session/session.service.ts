import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/models/session.model';

const ACCESS_TOKEN_KEY = "auth"

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private session = new BehaviorSubject < Session | null > ( null );

  constructor() { }
}
