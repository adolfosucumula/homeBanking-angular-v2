
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HttpEndpointSetting {

  private readonly url = 'http://localhost:3000/';

  endPointURL(){
    return this.url;
  }

  myHttpOption(){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

}
