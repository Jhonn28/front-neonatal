/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MethodsService } from './methods.service';
import { UtilsService } from './utils.service';
import { ICredencials } from '../interfaces/credentials.interface';
import { IResultAuth, IResultData } from '../interfaces';
import { Multinacional } from '../interfaces/company.interface';
import { UserCore } from '../class/user-core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: UserCore;

  accessDate: any;

  private _company: Multinacional[];
  private _authenticated: boolean = false;
  private _currentPassword: string;
  constructor(
    private http: HttpClient,
    private _utilService: UtilsService,
    private _methodService: MethodsService) { }

  signIn(credentials: ICredencials): Observable<IResultAuth> {
    credentials.ip = this._utilService.getIp();
    credentials.device = this._utilService.deviceInfo.deviceType || 'desktop';
    credentials.browser = this._utilService.deviceInfo.browser +
      ' (' + this._utilService.deviceInfo.os + ')' || 'Chrome (Windows)',
      credentials.userAgent = this._utilService.deviceInfo.userAgent || '';
    return this._methodService.post('auth/sign-in', credentials).pipe(
      tap((res: IResultAuth) => {
        //TODO: Almaceno el accesToken y el menu
        if (!res.isChangePassword) {
          this.accessToken = res.accessToken;
          this.menu = res.menu;
        }
        this._authenticated = true;
      }),
      map((result: IResultAuth) => {
        if (!result.isChangePassword) {
          delete result.accessToken;
        }
        return result;
      }),
      catchError((err) => {
        // console.log('error api', err);
        // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }

  forgotPassword(email: string): Observable<IResultAuth> {
    return this._methodService.get(`auth/forgot-password/${email}`).pipe(
      map((result: IResultAuth) => result),
      catchError((err) => {
        //console.log('error api', err);
        // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }


  resetPassword(token: string,body) {
    return this._methodService.patch(`auth/resetear-password/${token}`,body).pipe(
      map((result: IResultAuth) => result),
      catchError((err) => {
        //console.log('error api', err);
        // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return err;
      })
    );
  }

  userCompany(user: number): Observable<{
    isSelect: boolean;
    data: any;
  }> {
    return this._methodService.get(`seguridad/usuario/${this._utilService.getUserUid()}/empresa`).pipe(
      map((result: IResultData) => {
        this._company = result.data;
        //if(this._company.children.children)
        //console.log(this._company[0].children[0].children);
        return { isSelect: true, data: result.data };
      }),
      catchError((err) => {
        //console.log('error api', err);
        // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }


  signOut(): Observable<string> {
    // this.isMenu = true;
    const data = {
      ip: this._utilService.getIp(),
      device: this._utilService.deviceInfo.deviceType || 'desktop',
      browser: this._utilService.deviceInfo.browser + ' (' + this._utilService.deviceInfo.os + ')' || 'Chrome (Windows)',
      userAgent: this._utilService.deviceInfo.userAgent || '',
    };
    // console.log(' data >>> ', data);
    return this._methodService.post('auth/sign-out', data).pipe(
      map((res: IResultData) => {
        sessionStorage.clear();
        // console.log(res);
        return res.message;
      }),
      catchError((err) => {
        //console.log('error api', err);
        // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
        return throwError(err);
      })
    );
  }


  getIpPublic() {
    // console.log((this._utilService.isUndefined(sessionStorage.getItem('ip'))));
    if (!this._utilService.isUndefined(sessionStorage.getItem('ip'))) {
      const url = 'https://api.ipify.org/?format=json';
      return this.http.get(url).subscribe((res: any) => {
        //console.log("ip=>",res);
        sessionStorage.setItem('ip', this._utilService.encrypt(res.ip));
      },(response)=>{
        this._utilService.addWarningMessage('Ocurrio un error al obtener IP del dispositivo.');
      });
    }
  }

  validateToken(): Observable<boolean> {
    const user = this._utilService.getUserUid();
    return this._methodService.get(`auth/renew-token/${user}`).pipe(
      map((resp: IResultAuth) => {
        const { ide_segusu, nombre_segusu, username_segusu, correo_segusu, tema_segusu, nombre_segper, foto_segusu,responsable_seges } = resp.user[0];
        this.usuario = new UserCore(ide_segusu, nombre_segusu, username_segusu, correo_segusu, nombre_segper, tema_segusu, foto_segusu,responsable_seges);
        //console.log('user=>',this.usuario);
        this.accessToken = resp.accessToken;
        this.accessDate = resp.accessDate;
        // this.guardarLocalStorage(resp);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? null;
  }

  set menu(menu: any) {
    sessionStorage.setItem('menu', this._utilService.encrypt(JSON.stringify(menu)));
  }

  get menu(): any {
    if (sessionStorage.getItem('menu')) {
      const menu = this._utilService.decrypt(sessionStorage.getItem('menu'));
      return JSON.parse(menu);
    }
    return [];
  }


  get empresa() {
    return sessionStorage.getItem('emp') ?? null;
  }

  /**
   * Retorna true or false siinicio sesion en el sistema
   */
  isAuthenticated(): boolean {
    return Boolean(this.accessToken && this.empresa);
  }

  isAuth(): boolean {
    return Boolean(this.accessToken);
  }

  /*isAuthenticated(): Observable<boolean> {
    if (this.accessToken) {
      return of(true);
    }
    return of(false);
  }*/

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    /* if (this._authenticated) {
      return of(true);
    } */

    // Check the access token availability
    /*  if (!this.accessToken) {
       return of(false);
     } */
    return of(true);
    // Check the access token expire date
    /* if ( AuthUtils.isTokenExpired(this.accessToken) )
    {
        return of(false);
    } */

    // If the access token exists and it didn't expire, sign in using it
    // return this.signInUsingToken();
  }

  /**
   * Verifica si tiene permiso y acceso a la pantalla
   * @param ruta
   * @returns
   */
  isAccessScreen(ruta: string): Observable<boolean> {
    ruta = ruta.substring(ruta.indexOf('/', 1) + 1, ruta.length);

    if (ruta === 'no-autorizado' || ruta === 'cuenta') {
      return of(true);
    }

    for (const menu of this.menu) {
      const encontro = this.busquedaRecursiva(menu, ruta);
      if (encontro === true) {
        return of(true);
      }

    }
    return of(false);
  }

  private busquedaRecursiva(menu: any, ruta: string): boolean {
    if (menu.link === ruta) {
      return true;
    }
    if (menu.children) {
      for (const opciActual of menu.children) {
        const encontro = this.busquedaRecursiva(opciActual, ruta);
        if (encontro === true) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Almacena variables locales de la empresa
   *
   * @param multinacional
   * @param empresa
   * @param sucursal
   */
  saveVariableCompany(multinacional: number, empresa: number, sucursal: number): void {
    //console.log("Variabnlee=>>",multinacional,empresa,sucursal);
    sessionStorage.setItem('mul', this._utilService.encrypt(multinacional + ''));
    sessionStorage.setItem('emp', this._utilService.encrypt(empresa + ''));
    sessionStorage.setItem('suc', this._utilService.encrypt(sucursal + ''));
  }

  getUserData(): any {
    return [];
  }

  //TODO: SETTERS
  set currentPassword(value: string) {
    this._currentPassword = value;
  }

  //TODO: GETTERS
  get currentPassword(): string {
    return this._currentPassword;
  }

}
