import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { LoaderSpinnerService } from '../loader-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequest = 0;

  constructor(private loaderService: LoaderSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    this.totalRequest ++;
    this.loaderService.setLoading(true);
    return next.handle(request).pipe(
      finalize( () => {
        this.totalRequest --;
        if(this.totalRequest == 0){
          this.loaderService.setLoading(false);
        }
      })
    );
    //return next.handle(request);
  }
}
