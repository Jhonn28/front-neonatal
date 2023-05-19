import { Injectable } from '@angular/core';
import { MethodsService } from '../../../projects/libreria/src/lib/services/methods.service';
import { UtilsService } from '../../../projects/libreria/src/lib/services/utils.service';
import { Observable, throwError } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';
import { IResultData } from '../../../projects/libreria/src/lib/interfaces/result.interface';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor(private _methodsService: MethodsService,
    private _utilService: UtilsService) { }

  saveSupervision(body): Observable<void> {
    this._utilService.showSpinner();
    return this._methodsService.post('seguimiento/guardar-seguimiento', body).pipe(
      finalize(() => this._utilService.hideSpinner()),
      map((res: any) => {
        if (res.success) {
          this._utilService.addMessageSuccess('Se guardo correctamente el seguimiento');
        }
      })
    );
  }


  buscarSupervision(body): Observable<void> {
    this._utilService.showSpinner();
    return this._methodsService.post(`seguimiento/buscar`,body).pipe(
      finalize(() => this._utilService.hideSpinner()),
      map((res: IResultData) => {
        return res.data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }



  getDatosSeguimiento(encabezado:number): Promise<any> {
    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`seguimiento/datos-seguimiento/${encabezado}`).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getPuntaje(establecimiento:number): Promise<any> {
    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`seguimiento/puntaje/${establecimiento}`).subscribe(async (result: IResultData) => {
        resolve(result.data[0].puntaje);
      }, (err) => {
        reject(err);
      });
    });
  }



  getSeguimientos(body): Promise<any> {

   /*  body.forEach(element => {
      delete element.ciudad_thcab;
      delete element.fecha_thcab;
      delete element.hora_thcab;
      delete element.ide_segdis;
      delete element.ide_seges;
      delete element.nombre_establecimiento_thcab;
      delete element.nro_zona_thcab;
      delete element.provincia_thcab;
      delete element.puntaje_thcab;
      delete element.recetario_distrito_thcab;
      delete element.responsable_central_thcab;
      delete element.responsable_distrito_thcab;
      delete element.responsable_establecimiento_thcab;
      delete element.responsable_zona_thcab;
      delete element.tipo_establecimiento_thcab;
      delete element.total_talento_humano_thcab;

    }); */

    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.post(`seguimiento/seguimientos/${body.length}`,body).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }
}
