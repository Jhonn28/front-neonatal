import { Injectable } from '@angular/core';
import { MethodsService } from './methods.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IPassword, IPokedex, IProfile, IResultData } from '../interfaces';
import { UtilsService } from './utils.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ITemporalPassword } from '../interfaces/temporal-password.interface';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  ciudad: string;
  constructor(private _methodService: MethodsService, private _utilService: UtilsService,private http: HttpClient) { }

  /**
  * generates the audit when accessing any option or screen
  *
  * @param screen screen access
  */
  auditAccessScreen(screen: number): void {
    const body = {
      screen,
      ip: this._utilService.getIp(),
      device: this._utilService.deviceInfo.deviceType || 'desktop',
      browser: this._utilService.deviceInfo.browser + ' (' + this._utilService.deviceInfo.os + ')' || 'Chrome (Windows)',
      userAgent: this._utilService.deviceInfo.userAgent || ''
    };
    this._methodService.post('seguridad/auditoria/acceso-pantalla', body).subscribe(
      res => res),
      catchError(err => throwError(err));
  }

  /**
   * Actualiza el perfil del usuario
   * @param body IProfile
   * @param user primary key usuario
   * @returns IResultData
   */
  updateProfile(body: IProfile, user: number): Observable<IResultData> {
    return this._methodService.patch('seguridad/usuario/cuenta/' + user, body).pipe(
      map((res: IResultData) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Retorna la informacion de la sucursal activa
   * @returns data
   */
  getInfoSucursal(sucursal?: number): Observable<any> {
    (!sucursal)? sucursal = this._utilService.getSucursal():0;
    if (sucursal === -1) {
      sessionStorage.clear();
      return
    }
    return this._methodService.get('seguridad/sucursal/' + sucursal).pipe(
      map((res: IResultData) => {
        return res.data[0];
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Permite activa o desactivar la cuenta de un usuario
   * @param user usuario
   * @param state true: activa, false: desactiva
   * @returns message
   */
  activateDisableUser(user: number, state: boolean) {
    return this._methodService.get(`seguridad/usuario/ ${user}/activar/${state}`).pipe(
      map((res: IResultData) => {
        return res.message;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Permite bloquear o desbloquear la cuenta de un usuario
   * @param user usuario
   * @param state true: bloquea, false: desbloquea
   * @returns message
   */
  blockUnblockUser(user: number, state: boolean) {
    return this._methodService.get(`seguridad/usuario/ ${user}/bloquear/${state}`).pipe(
      map((res: IResultData) => {
        return res.message;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Permite Activa y desactiva la cuenta de un usuario
   * @param user
   * @param state
   * @returns
   */
  getActiveChangePassword(user: number, state: boolean): Observable<string> {
    return this._methodService.get(`seguridad/getActiveChangePassword/${user}/${state}`).pipe(
      map((res: IResultData) => {
        return res.message;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Genera un contraseña temporal para restablecer contraseña
   * @param password
   * @param user
   * @returns
   */
  generateTemporaryPassword(body: ITemporalPassword): Observable<string> {
    //console.log('object=>',body);
    return this._methodService.post(`seguridad/password-temporal`,body).pipe(
      map((res: IResultData) => {
        return res.message;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getRulesPassword(perfil?: number, token?: string): Observable<any> {

    if (token) {
      let headers = new HttpHeaders();
      headers = headers.set('authorization', `Bearer ${token}`);
      return this._methodService.get(`seguridad/reglas-password/${perfil}`, { headers: headers }).pipe(
        map((res: IResultData) => {
          return res.data;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }
    const profile = 1;
    return this._methodService.get(`seguridad/reglas-password/${perfil}`,).pipe(
      map((res: IResultData) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Actualiza la contraseña de una usuario
   * @param body IPassword
   * @param user
   * @returns
   */
  updatePassword(body: IPassword, user: number, token?: string) {

    if (token) {
      let headers = new HttpHeaders();
      headers = headers.set('authorization', `Bearer ${token}`);
      return this._methodService.patch(`seguridad/actualizar-password/${user}`, body, { headers: headers }).pipe(
        map((res: IResultData) => {
          return res.message;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }
    const profile = 1;
    return this._methodService.patch(`seguridad/actualizar-password/${user}`, body).pipe(
      map((res: IResultData) => {
        return res.message;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Retorna las sucursales de la empresa con el que inicio sesión
   */
  getBranchs() {
    const empresa = this._utilService.getEmpresa();
    return this._methodService.get(`seguridad/sucursal?empresa=${empresa}`).pipe(
      map((res: IResultData) => {
        return res.data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

/*   getGeolocation() {
    const ip = this._utilService.getIp();
    return this._methodService.getLocation(`http://geoplugin.net/json.gp?ip=${ip}`).pipe(
      map((res: IPokedex) => {
        console.log('CIUDAD=>',res);
        this.ciudad = res.geoplugin_city;
          return res;
      })
    )
  } */
  getClima(ciudad:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=sp&appid=695aa7aa00c1b95b9992fd7438e44a2d&units=metric`).pipe(
      map(resp => {
        return resp;
      }),catchError((err)=>{
        this._utilService.addWarningMessage('Ocurrio un problema al consultar el clima de la zona.')
        return err;
      })
    )
  }

}
