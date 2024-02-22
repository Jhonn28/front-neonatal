import { Injectable } from '@angular/core';
import { IResultData, MethodsService, UtilsService } from '../../../projects/libreria/src/public-api';
import { Observable, catchError, finalize,map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(private _methodsService: MethodsService,
    private _utilService: UtilsService) { }

    getInsumos(area: number): Promise<any> {
       return new Promise(async (resolve, reject) => {
         await this._methodsService.get(`indicador/insumos/${area}`).subscribe(async (result: IResultData) => {
           resolve(result.data);
         }, (err) => {
           reject(err);
         });
       });
     }

     getNumeroSala(establecimiento?:number): Promise<any> {
      (!establecimiento)? establecimiento=this._utilService.getSucursal():0;
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/numero-sala/${establecimiento}`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    saveSupervision(body): Observable<void> {
      this._utilService.showSpinner();
      return this._methodsService.post('indicador/guardar-1', body).pipe(
        finalize(() => this._utilService.hideSpinner()),
        map((res: any) => {
          if (res.success) {
            this._utilService.addMessageSuccess('Se guardo correctamente el seguimiento');
            return res.success;
          }else{
            this._utilService.addMessageInfo(res.message);
            return res.success;
          }
        })
      );
    }

    //TODO: tiempo
    getTiempo(condition?:string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/tiempo?${condition}`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    //
    getIndicador(data,condition?:string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.post(`indicador/indicadores?${condition}`,data).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }


    /* TODO: indicador 2 */

    getPrenatal(): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/prenatal`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    //save tipo 2
    saveData(body,t1,ide1,t2,t3?:string): Observable<void> {
      this._utilService.showSpinner();
      return this._methodsService.post(`indicador/guardar/${t1}/${ide1}/${t2}?${t3}`, body).pipe(
        finalize(() => this._utilService.hideSpinner()),
        map((res: any) => {
          console.log('data=>',res);
          if (res.success) {
            this._utilService.addMessageSuccess('Se guardo correctamente el seguimiento');
            return res.success;
          }else{
            this._utilService.addMessageInfo(res.message);
            return res.success;
          }
        })
      );
    }

    //Indicadores

    //Uno a


    getIUnoA(distrito: number,establecimiento: string): Observable<void> {
      this._utilService.showSpinner();
      return this._methodsService.get(`indicador/uno-a/${distrito}?${establecimiento}`).pipe(
        finalize(() => this._utilService.hideSpinner()),
        map((res: IResultData) => {
          return res.data;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }

    //
    getDataUnoA(ide:number,area:number): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/data-uno-a/${ide}/${area}`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }


    //encabezado general
    getEncabezadoGeneral(distrito: number,herramienta: string,establecimiento: string): Observable<void> {
      this._utilService.showSpinner();
      return this._methodsService.get(`indicador/encabezado/${distrito}/${herramienta}?${establecimiento}`).pipe(
        finalize(() => this._utilService.hideSpinner()),
        map((res: IResultData) => {
          return res.data;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }

    //lista de indicadores
    getDataIndicador(tabla:string,ide:number,orden:string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/data-indicador/${tabla}/${ide}/${orden}`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }




    //updateData

    updateData(body,t1:string,condition:string,t2:string,condition2:string,indicador:string,t3?:string,condition3?:string): Observable<void> {
      this._utilService.showSpinner();
      return this._methodsService.post(`indicador/actualizar/${t1}/${condition}/${t2}/${condition2}/${indicador}?${t3}${condition3}`, body).pipe(
        finalize(() => this._utilService.hideSpinner()),
        map((res: any) => {
          if (res.success) {
            this._utilService.addMessageSuccess('Se guardo correctamente el seguimiento');
          }
        })
      );
    }

    getPorcentajeComplicacion(establecimiento:number,anio:string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        await this._methodsService.get(`indicador/porcentaje-complicacion/${establecimiento}/${anio}`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }


    getPuntaje(distrito:number): Promise<any> {
      return new Promise(async (resolve, reject) => {
       // console.log(user)
        await this._methodsService.get(`indicador/puntaje/${distrito}`).subscribe(async (result: IResultData) => {
          console.log('puntaje:>',result);
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    getReporteDistrito(distrito:number,anio): Promise<any> {
      return new Promise(async (resolve, reject) => {
       // console.log(user)
        await this._methodsService.get(`indicador/reporte-distrito/${distrito}/${anio}`).subscribe(async (result: IResultData) => {
          console.log('Data:>',result);
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    getReporteDistritoTrimestral(distrito:number,anio,trimestre: number): Promise<any> {
      return new Promise(async (resolve, reject) => {
       // console.log(user)
        await this._methodsService.get(`indicador/reporte-distrito-trimestral/${distrito}/${anio}/${trimestre}`).subscribe(async (result: IResultData) => {
          console.log('Data:>',result);
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }


    getReporteZonal(anio): Promise<any> {
      return new Promise(async (resolve, reject) => {
       // console.log(user)
        await this._methodsService.get(`indicador/reporte-zonal/${anio}`).subscribe(async (result: IResultData) => {
          console.log('Data:>',result);
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }

    getHistorico(): Promise<any> {
      return new Promise(async (resolve, reject) => {
       // console.log(user)
        await this._methodsService.get(`indicador/historico`).subscribe(async (result: IResultData) => {
          resolve(result.data);
        }, (err) => {
          reject(err);
        });
      });
    }



}
