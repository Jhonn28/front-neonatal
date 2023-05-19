import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import { IResponseAutorizacionSri } from '../interfaces/autorizacionsri.interface';
import { IResponseRecepcionSri } from '../interfaces/sendsri.interface';
import { MethodsService } from './methods.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {

  constructor(@Inject('env') private url, private http: HttpClient,
    private _methodService: MethodsService,
    private _utilService: UtilsService) {
    if (!url.API_FACTURACION) {
      console.error('OJO: No tiene configurado al URL del ENDPOINT de FACTURACION');
    }
  }
  /*
    emitComprobant(access_key: string) {
      const url = `${this.url.API_FACTURACION}/comprobantes/${access_key}/emitir`;
      return this.http.patch(url, '').pipe(
        map((res: any) => {
          return res;
        }),
        catchError(err => {
          //console.log(err);
          return throwError(err);
        })
      );

    }
   */
  sendEmails(factura: string, email: string[]) {
    const body = { emails: email };
    //const url = `${this.url.API_FACTURACION}/comprobantes/${factura}/notificar-a-emails`;
    return this._methodService.post(`comprobante/${factura}/notificar-a-emails`, body).pipe(
      map((res: any) => {
        return res;
      })
    );

  }

  saveCertificado(body: any) {
    const url = `${this.url.API_FACTURACION}/certificado-digital/catalogue`;
    return this.http.post(url, body).pipe(
      map((res: any) => {
        return res;
      })
    );

  }

  private firmarComprobante(factura: number) {
    const url = `${this.url.API_FACTURACION}`;
    return this._methodService.get(`comprobante/factura/${factura}/format-json`)
      .pipe(
        mergeMap(data => this.http.post(`${url}/comprobantes/facturas`, data).pipe(
          map((res: any) => {
            return res.result.comprobanteFirmado;
          })
        ))
      );
  }

  private sendComprobante(xml: string, factura: number) {
    const url = `${this.url.API_FACTURACION}`;
    return this.http.post(`${url}/comprobantes/enviar`, { comprobante: xml })
      .pipe(

        map((data: IResponseRecepcionSri) => data.result),
        mergeMap(res => {
          switch (res.estado) {
            case 'RECIBIDA':
              //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
              break;
            case 'DEVUELTA':
              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                estado: 3,
                mensajeRecepcion: res
              })
              break;
          }
          console.log(res.estado)


        })

      );
  }

  /**
   * Genera, Firma, Envía y autoriza un comprobante ante el SRI en un único paso
   * @param estado
   * @param factura
   * @param clave_acceso
   * @returns
   */
  emitirComprobante(estado: number, factura: number, clave_acceso: string, email: string) {
    const url = `${this.url.API_FACTURACION}`;
    if (estado === this.estadoPendiente()) {
      //console.log('estado pendiente')
      return this._methodService.get(`comprobante/factura/${factura}/format-json`)
        .pipe(
          mergeMap(data => this.http.post(`${url}/comprobantes/facturas`, data).pipe(
            map((res: any) => res.result.comprobanteFirmado),
            mergeMap(xml => this.http.post(`${url}/comprobantes/enviar`, { comprobante: xml }).pipe(
              map((data: IResponseRecepcionSri) => data.result),
              mergeMap(res => {
                //console.log('Respuesta recepcion sri => ', res);
                switch (res.estado) {
                  case 'RECIBIDA':
                    return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                      estado: this.estadoRecibido(),
                      mensajeRecepcion: null
                    }).pipe(
                      mergeMap(autorizado => this.http.post(`${url}/comprobantes/${clave_acceso}/autorizar`, {}).pipe(
                        map((mautorizado: IResponseAutorizacionSri) => mautorizado.result),
                        mergeMap(respaut => {
                          switch (respaut.autorizaciones.autorizacion.estado) {
                            case 'AUTORIZADO':
                              if (this._utilService.isUndefined(email)) {
                                //console.log('tengo correo');
                                return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                                  estado: this.estadoAutorizado(),
                                  ambiente: respaut.autorizaciones.autorizacion.ambiente,
                                  fechaAutorizacion: respaut.autorizaciones.autorizacion.fechaAutorizacion,
                                  xml: respaut.autorizaciones.autorizacion.comprobante
                                }).pipe(
                                  mergeMap(res => {
                                    return this._methodService.post(`comprobante/${factura}/notificar-a-emails`, { emails: [email] }).pipe(
                                      map((res: any) => {
                                        return res;
                                      })
                                    );
                                  })
                                )
                              } else {
                                //console.log('no tengo correo');
                                return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                                  estado: this.estadoAutorizado(),
                                  ambiente: respaut.autorizaciones.autorizacion.ambiente,
                                  fechaAutorizacion: respaut.autorizaciones.autorizacion.fechaAutorizacion,
                                  xml: respaut.autorizaciones.autorizacion.comprobante
                                });
                              }

                              break
                            case 'NO AUTORIZADO':
                              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                                estado: this.estadoNoAutorizado(),
                                mensajeAutorizacion: respaut
                              })
                              break
                            case 'RECHAZADO':
                              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                                estado: this.estadoRechazado(),
                                mensajeAutorizacion: respaut
                              })
                              break
                            default:
                              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                                estado: this.estadoRechazado(),
                                mensajeAutorizacion: respaut
                              })
                              break
                          }
                        })
                      ))
                    )
                    break;
                  case 'DEVUELTA':
                    return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                      estado: this.estadoDevuelto(),
                      mensajeRecepcion: res
                    })
                    break;
                  default:
                    return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                      estado: this.estadoDevuelto(),
                      mensajeRecepcion: res
                    })
                    break;
                }
              })
            ))
          ))
        );
    } else if (estado === this.estadoRecibido()) {
      //console.log('estado recibido')
      return this.http.post(`${url}/comprobantes/${clave_acceso}/autorizar`, {}).pipe(
        map((mautorizado: IResponseAutorizacionSri) => mautorizado.result),
        mergeMap(respaut => {
          //console.log(respaut);
          switch (respaut.autorizaciones.autorizacion.estado) {
            case 'AUTORIZADO':
              if (this._utilService.isUndefined(email)) {
                //console.log('tengo correo');
                return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                  estado: this.estadoAutorizado(),
                  ambiente: respaut.autorizaciones.autorizacion.ambiente,
                  fechaAutorizacion: respaut.autorizaciones.autorizacion.fechaAutorizacion,
                  xml: respaut.autorizaciones.autorizacion.comprobante
                }).pipe(
                  mergeMap(res => {
                    return this._methodService.post(`comprobante/${factura}/notificar-a-emails`, { emails: [email] }).pipe(
                      map((res: any) => {
                        return res;
                      })
                    );
                  })
                )
              } else {
                //console.log('no tengo correo');
                return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                  estado: this.estadoAutorizado(),
                  ambiente: respaut.autorizaciones.autorizacion.ambiente,
                  fechaAutorizacion: respaut.autorizaciones.autorizacion.fechaAutorizacion,
                  xml: respaut.autorizaciones.autorizacion.comprobante
                });
              }
              break
            case 'NO AUTORIZADO':
              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                estado: this.estadoNoAutorizado(),
                mensajeAutorizacion: respaut
              })
              break
            case 'RECHAZADO':
              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                estado: this.estadoRechazado(),
                mensajeAutorizacion: respaut
              })
              break
            default:
              return this._methodService.put(`comprobante/actualizar-estado/${factura}`, {
                estado: this.estadoRechazado(),
                mensajeAutorizacion: respaut
              })
              break
          }
        }));
    }

  }


  private autorizarComprobante(clave_acceso: string) {
    const url = `${this.url.API_FACTURACION}`;
    return this.http.post(`${url}/comprobantes/${clave_acceso}/autorizar`, {});
  }

  // ESTADOS DE LA FACTURA

  estadoPendiente() {
    return 1;
  }

  estadoRecibido() {
    return 2;
  }

  estadoDevuelto() {
    return 3;
  }

  estadoRechazado() {
    return 4;
  }

  estadoAutorizado() {
    return 5;
  }

  estadoNoAutorizado() {
    return 6;
  }

  estadoAnulado() {
    return 7;
  }

}
