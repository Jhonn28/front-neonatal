import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../services/utils.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private countRequest = 0;

  constructor(private _util: UtilsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.countRequest) {
      //this._util.show();
    }
    this.countRequest++;

    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest--;
        if (!this.countRequest) {
          //this._util.hide();
        }
      })
    )
  }
}
