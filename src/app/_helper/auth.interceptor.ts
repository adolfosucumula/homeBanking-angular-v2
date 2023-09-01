
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class authHttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error("Method not implemented.");

    req: req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }


}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: authHttpRequestInterceptor, multi: true },
];
