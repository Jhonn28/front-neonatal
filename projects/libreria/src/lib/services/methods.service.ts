import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

  constructor(@Inject('env') private url, private http: HttpClient) {
  }

  /**
   * Retrieve information from the given server using a given URI.
   * Requests using GET should only retrieve data and should have no other
   * effect on the data.
   * @param service url
   * @param options
   * @returns
   */
  get(service: string, options?: any): Observable<Object> {
    const url = `${this.url.API_URL}/${service}`;
    return this.http.get(url, options);
  }

  /**
   * Used to send data to the server.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
  post(service: string, body: any, options?: any): Observable<Object> {
    // console.log('Api URL >> ', this.url.API_URL);
    const url = `${this.url.API_URL}/${service}`;
    //console.log('body=>',body);
    // console.log('envio http >>> ', url, body, options);
    return this.http.post(url, body, options);
  }

  /**
   * Replaces all the current representations of the target resource with the uploaded content.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
  patch(service: string, body: any, options?: any): Observable<Object> {
    const url = `${this.url.API_URL}/${service}`;
    return this.http.patch(url, body, options);
  }

  /**
   * Replaces all the current representations of the target resource with the uploaded content.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
   put(service: string, body: any, options?: any): Observable<Object> {
    const url = `${this.url.API_URL}/${service}`;
    return this.http.put(url, body, options);
  }

  /**
   * Removes all the current representations of the target resource given by URI.
   * @param service url
   * @param options
   * @returns
   */
  delete(service: string, options?: any): Observable<Object> {
    const url = `${this.url.API_URL}/${service}`;
    return this.http.delete(url, options);
  }

  /**
   * Retrieve information from the given server using a given URI.
   * Requests using GET should only retrieve data and should have no other
   * effect on the data.
   * @param service url
   * @param options
   * @returns
   */
   getLocation(service: string, options?: any): Observable<Object> {
    return this.http.get<any>(service, options);
  }
}
