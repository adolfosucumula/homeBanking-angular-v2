import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderSpinnerService {

  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean): void{
    this.loading = loading;
  }

  getLoading(): boolean{
    return this.loading;
  }
}
