import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MethodsService } from '../../../projects/libreria/src/lib/services/methods.service';
import { UtilsService } from '../../../projects/libreria/src/lib/services/utils.service';
import { IResultData } from '../../../projects/libreria/src/lib/interfaces/result.interface';
import { SecurityService } from '../../../projects/libreria/src/public-api';
@Injectable({
  providedIn: 'root'
})
export class TalentoHumanoService {

  constructor(private _methodsService: MethodsService, private _utilService:UtilsService,
    private _securityService: SecurityService) { }



  //user
/**
 *
 * @param user nombre de usuario
 * @returns Informacion del usuario, distrito, zona, permisos, perfil.
 */
  getByUser(user: string): Promise<any> {

    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`seguridad/username/${user}`).subscribe(async (result: IResultData) => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  getResponsable(query: string): Promise<any> {

    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`talento-humano/responsable?${query}`).subscribe(async (result: IResultData) => {
        resolve(result.data[0]);
      }, (err) => {
        reject(err);
      });
    });
  }



  getEstablecimientos(): Promise<any> {

    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`seguridad/establecimientos`).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }



  getDistritos(): Promise<any> {

    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`talento-humano/distritos`).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getEstablecimientoDistrito(distrito: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
     // console.log(user)
      await this._methodsService.get(`talento-humano/establecimientos/${distrito}`).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }

  getExisteEstablecimiento(query: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this._methodsService.get(`seguridad/existe-establecimiento?${query}`).subscribe(async (result: IResultData) => {
        resolve(result.data);
      }, (err) => {
        reject(err);
      });
    });
  }




}
