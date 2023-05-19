import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  urlLocal = 'assets';
  urlTerceros = 'https' || 'http';

  constructor(@Inject('env') private url,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = this.url.API_URL;
    // request = request.clone({ url: apiUrl + request.url });
    console.log(' url >> ',request.url);
    return next.handle(request);

  }
}
