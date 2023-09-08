import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/models/session.model';

const ACCESS_TOKEN_KEY = "auth"

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * The BehaviorSubject help us to share data with
   * different services component
   */
  private session = new BehaviorSubject < Session | null > ( null );

  constructor() {
    /**
     * When the user press F5 to update the  page,
     * this class will be recreated and the constructor
     * activated. When this occure we try to cacth the user session
     * from the sessionStorage
     */
    this.restoreSession();
  }

  /**
   * This method restore the session value when the page is update
   * @returns
   */
  restoreSession(){
    const jsonSession = sessionStorage.getItem(
      ACCESS_TOKEN_KEY
    )

    if(!jsonSession){
      return;
    }

    const dataSession: Session =
      JSON.parse(jsonSession);
    this.session.next(dataSession);

  }

  /**
   *
   * @param dataSession
   */
  saveSession(dataSession: Session){
    sessionStorage.setItem(
      ACCESS_TOKEN_KEY,
      JSON.stringify(dataSession)
    )

    /**
     * Trigger a new value to who is listening
     * the Observable returned by
     * the getSession method
     */
    this.session.next(dataSession);

  }

  clearSession(){
    sessionStorage.clear();
    this.session.next(null)
  }

  /**
   * Return a Observable with
   * the data of the user session
   */
  getSession(){
    return this.session.asObservable()
  }

  isLogged(){
    return this.session.value !== null;
  }



}
