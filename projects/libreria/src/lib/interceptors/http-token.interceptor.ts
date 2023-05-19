import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(@Inject('env') private url, private _authService: AuthService, private _utilService: UtilsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(this.url.API_URL)=== false) {
      // console.log('Ingreso si no es una api local > ', request.url);
      return next.handle(request);
    }
    if (this._authService.isAuth()) {
      const body = {
        ide_segmul: this._utilService.getMultinacional(),
        ide_segemp:  this._utilService.getEmpresa(),
        ide_segsuc:  this._utilService.getSucursal(),
        ide_segusu:  this._utilService.getUserUid(),
        nik_name:  this._utilService.getUsername()
      };
      // console.log('envio body >>> ', body)
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${this._authService.accessToken}`
        },
        body: { ...request.body, ...body }
      });
    }
    return next.handle(request);
  }
}
