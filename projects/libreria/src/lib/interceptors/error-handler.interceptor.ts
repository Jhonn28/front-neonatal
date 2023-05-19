import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from '../services';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _utilService: UtilsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
       /*  console.log(e);
        console.log(e.error.result); */
        if (this._utilService.isUndefined(e.error.auth)) {
          return throwError(e);
        }
        // Como tambiém puedes usar una libreria para mostrar los tips de errores...
        if (e.error.result) {
          this._utilService.addErrorMessage('<p style="font-size:1rem"> <strong>Estado: </strong>' + e.error.result.status + '</p> <p style="font-size:0.9rem; text-align: justify;"><strong>Mensaje: </strong>' + e.error.result.message + '</p>  <p style="font-size:1rem"><strong>Fecha: </strong> ' + e.error.result.timestamp +'</p>', 'ERROR FACTURACION ELECTRONICA');
        } else if (this._utilService.isUndefined(e.error)) {
          /* this._utilService.addErrorMessage('<p style="font-size:1rem">' + e.error.message + '</p> <p style="font-size:0.9rem; text-align: justify;"><strong>Origen: </strong>' + e.message + '</p> ', 'No autorizado'); */
          this._utilService.addErrorMessage('<p style="font-size:1rem">' + e.error.message + '</p> ', 'No autorizado');
        } else {
          this._utilService.addErrorMessage('<p>' + e.error + '</p> <p><strong>Origen: </strong>' + e.message + '</p> ');
        }
        return throwError(e);
      })
    );
  }
}
