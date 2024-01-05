import { Injectable } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// framework
import { TableCoreComponent } from '../core/table';
import { MethodsService } from './methods.service';
import { IDeviceInfo, IResultData } from '../interfaces';

// libreria terceros
import { NgxSpinnerService } from "ngx-spinner";
import { DeviceDetectorService } from 'ngx-device-detector';
import { JwtHelperService } from '@auth0/angular-jwt';
import crytojs from 'crypto-js';
import Swal from 'sweetalert2';
import moment from 'moment'
import { PASSWORD_ENCRIPT } from '../config/config.const';
import { ToastrService } from 'ngx-toastr';
import { toInteger } from 'lodash';
import { SystemService } from './system.service';
// import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // variables publicos
  FORMAT_DATE_BDD = 'YYYY-MM-DD';
  FORMAT_DATE_FRONT = 'DD/MM/YYYY';
  TIME_FORMAT = 'HH:mm:ss';
  FORMAT_DATE_TIME_FRONT = 'DD/MM/YYYY HH:mm:ss';
  deviceInfo: IDeviceInfo;
  clock;

  // variable privatos
  private _helper = new JwtHelperService();
  private _provincias = 24;
  private _now: Date = new Date();
  private RegExp = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  semana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  private subject$ = new BehaviorSubject<boolean>(false);

  //systemDate = [];
  constructor(
    private router: Router,
    private _methodService: MethodsService,
    private spinner: NgxSpinnerService,
    private deviceService: DeviceDetectorService,
    private _toastr: ToastrService,
    //private _systemService: SystemService
  ) {
    this.initDeviceDetector();
    //this._progressRef = progress.ref('myProgress');
  }

  /**
    * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
    */
  get exactMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'exact'
    };
  }

  /**
   * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
   */
  get subsetMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'subset'
    };
  }

  getIp(): string {
    if (sessionStorage.getItem('ip')) {
      return this.decrypt(sessionStorage.getItem('ip'));
    }
    return '127.0.0.1';
  }

  private initDeviceDetector(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo.isMobile = this.deviceService.isMobile();
    this.deviceInfo.isTablet = this.deviceService.isTablet();
    this.deviceInfo.isDesktop = this.deviceService.isDesktop();
  }


  // TODO: SPINNER

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();

  }

  // TODO: MESSAGE SWEETALERT
  /**
   * Error message alert
   * @param message
   * @param title
   */
  addErrorMessage(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Error';
    }
    Swal.fire({
      icon: 'error',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  /**
   * Warning message alert
   * @param message
   * @param title
   */
  addWarningMessage(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Advertencia';
    }
    Swal.fire({
      icon: 'warning',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  /**
   * Success message alert
   * @param message
   * @param title
   */
  addMessageSuccess(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Éxito';
    }
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  addMessageInfo(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Información';
    }
    Swal.fire({
      icon: 'info',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  /**
   * Confirmation alert
   * @param message
   * @param callback
   * @param title
   */
  confirmationAlert(message: string, callback, title?: string) {
    if (!this.isUndefined(title)) {
      title = 'Confirmar';
    }
    Swal.fire({
      title: title,
      icon: 'question',
      html: message,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText:
        '<span class="ion-padding-horizontal"></span> Aceptar <span class="ion-padding-horizontal"></span> ',
      confirmButtonAriaLabel: 'Aceptar',
      cancelButtonText:
        '<span class="ion-padding-horizontal"></span>  Cancelar <span class="ion-padding-horizontal"></span> ',
      cancelButtonAriaLabel: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }



  // TODO: FECHAS

  getDateCurrent(formato?: string): string {
    if (this.isUndefined(formato) === false) {
      formato = this.FORMAT_DATE_FRONT;
    }
    return this.getDateFormat(new Date(), formato);
  }

  /**
   * Retorna la hora actual en formato
   * @returns HH:mm:ss
   */
  getCurrentTime() {
    return moment().format('HH:mm:ss');
  }

  getDateFormat(date: any, format?: string): string {
    if (this.isUndefined(date)) {
      if (this.isUndefined(format) === false) {
        format = this.FORMAT_DATE_BDD;
      }
      return this.getFormatDate(date, format);
    }
    return null;
  }

  getFormatTime(time: Date, format?: string): string {
    if (this.isUndefined(time)) {
      if (this.isUndefined(format) === false) {
        format = 'DD-MM-YYYY';
      }
      return this.getDateFormat(time, format);
    }
    return null;
  }

  isValidDate(date, format = 'YYYY-MM-DD'): boolean {
    return moment(date, format).isValid();
  }

  toDate(date, format = 'YYYY-MM-DD'): Date {
    if (this.isUndefined(date)) {
      return moment(date, format).toDate();
    }
    return null;
  }

  getFormatDate(date: Date, format: string): string {
    return moment(date).format(format.toUpperCase());
  }

  // TODO: UTILS

  getUidOption(ruta?: string): string {
    if (!this.isUndefined(ruta)) {
      ruta = this.router.url;
      // console.log(ruta.substring(9, ruta.length));
      // console.log(ruta.substring(ruta.lastIndexOf('/',ruta.length),ruta.length));
      // console.log(ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length));
      ruta = ruta.substring(9, ruta.length);
    }

    if (ruta.includes('generic_')) {
      // Para pantallas genericas
      const data = ruta.substring(ruta.lastIndexOf('_') + 1, ruta.length);
      return data;
    }
    else if (this.isNumber(ruta)) {
      // Para pantallas que recieben 1 parametro id
      ruta = this.router.url;
      ruta = ruta.substring(0, ruta.lastIndexOf('/'));
      ruta = ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length);
    }
    /* const menus = JSON.parse(sessionStorage.getItem('menu')) || [];
     // console.log(menus);
     // console.log(ruta);
     // Busqueda recursiva
     for (const opciActual of menus) {
       const encontro = this.searchRecursiveUidOption(opciActual, ruta);
       if (encontro !== null) {
         return encontro;
       }
     }*/
    return null;
  }

  // TODO: METHODS PRIVATE

  private searchRecursiveUidOption(opcion: any, ruta: string): string {
    if (opcion.link === ruta) {
      return opcion.id;
    }
    if (opcion.children) {
      for (const opciActual of opcion.children) {
        const encontro = this.searchRecursiveUidOption(opciActual, ruta);
        if (encontro !== null) {
          return encontro;
        }
      }
    }

    return null;
  }

  // TODO: VALIDATIONS

  isNumber(valor): boolean {
    return !isNaN(parseFloat(valor)) && !isNaN(valor - 0);
  }

  /**
   * Verifica si una variable es undefined | null
   */
  isUndefined(variable: any): boolean {
    return typeof variable !== 'undefined' && variable !== null;
  }

  // TODO: SAVE
  saveScreen(...tablas: TableCoreComponent[]): Promise<boolean> {

    return new Promise(resolve => {
      const lisAgrupa = [];
      for (const tab of tablas) {
        // valida que no haya errores para ejecutar todas las sentencias
        const lista = tab.save();
        if (lista.length > 0) {
          tab.loading = true;
          lisAgrupa.push(...lista);
        }
      }
      if (lisAgrupa.length > 0) {
        //console.log(lisAgrupa);
        this.runListSQL(lisAgrupa).subscribe(resp => {
          for (const tab of tablas) {
            tab.onCommit();
            // tab.actualizar();
            if (tab.isFocus()) {
              tab.update();
            }
            tab.loading = false;
          }
          this.addMessageSuccess('Datos guardados exitosamente');
          resolve(true);
        }, (err) => {
          resolve(false);
          for (const tab of tablas) {
            tab.loading = false;
          }
        });
      }
      else {
        resolve(true);
      }
    });
  }

  private runListSQL(listaSQL: any): Observable<any> {
    const body = {
      listaSQL
    };
    // console.log('ejecuto al guardar, ', body);
    return this._methodService.post('seguridad/guardar', body).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getUsername(): string {
    const token = this.decodeToken();
    return token.use || null;
  }

  getUserUid(): number {
    const token = this.decodeToken();
    return token.sub || -1;
  }

  getPerfilUid(): number {
    const token = this.decodeToken();
    return token.per || -1;
  }

  /**
   * Retorna si el usuario logueado es administrador multinacional
   * @returns boolean
   */
  getAdminMultinacional(): boolean {
    const token = this.decodeToken();
    //console.log(token);
    return token.adm || false;
  }

  /**
   * Retorna el uid de la empresa
   * @returns number
   */
  getEmpresa(): number {
    if (sessionStorage.getItem('emp')) {
      return parseInt(this.decrypt(sessionStorage.getItem('emp')));
    }
    return -1;
  }

  /**
   * Retorna el uid de la sucursal
   * @returns number
   */
  getSucursal(): number {
    if (sessionStorage.getItem('suc')) {
      //console.log("Sucursal=>",this.decrypt(sessionStorage.getItem('suc')));
      return parseInt(this.decrypt(sessionStorage.getItem('suc')));
    }
    return -1;
  }

  /**
   * Retorna el uid de la multinacional
   * @returns number
   */
  getMultinacional(): number {
    if (sessionStorage.getItem('mul')) {
      return parseInt(this.decrypt(sessionStorage.getItem('mul')), 12)
    }
    return -1;
  }

  /**
   * Encripta valores
   * @param value valor a encriptar
   * @returns
   */
  encrypt(value: string): string {
    return crytojs.AES.encrypt(value, PASSWORD_ENCRIPT).toString();
  }

  /**
   * Desencripta un valor generado por el aplicativo
   * @param value valor a desencriptar
   * @returns
   */
  decrypt(value: string): string {
    return crytojs.AES.decrypt(value, PASSWORD_ENCRIPT).toString(crytojs.enc.Utf8);
  }

  /**
   * Retorna el token decodificado
   * @returns
   */
  private decodeToken(): any {
    if (sessionStorage.getItem('accessToken')) {
      return this._helper.decodeToken(sessionStorage.getItem('accessToken'));
    }
    return null;
  }

  /**
  * Decodifica un token
  * @param token
  */
  decodeTokens(token: string) {
    return this._helper.decodeToken(token);
  }

  getTokenExpirationDate(token: string): Date {
    return this._helper.getTokenExpirationDate(token);
  }

  isExpiredToken(token: string) {
    return this._helper.isTokenExpired(token);
  }

  /**
   * Almacena una variable en el sesion storage
   * @param name nombre de la variable
   * @param value valor de la variable
   */
  setVariable(name: string, value: string): void {
    sessionStorage.setItem(name, this.encrypt(value));
  }

  /**
   * Retorna el valor del parametro del sistema
   * @param name nombre del parametro
   * @returns
   */
  getVarible(name: string): Observable<any> {
    return this._methodService.get('seguridad/parametro/' + name).pipe(
      map((resp: IResultData) => {
        if (resp.data.length > 0) {
          return resp.data[0].valor_segpar;
        }
        return -1;
      }),
      catchError(error => of(false))
    );
  }

  /**
   * Retorna una variable almacenada en el sesion storage
   * @param name
   * @returns
   */
  getVariableSession(name: string): string {
    if (sessionStorage.getItem(name)) {
      crytojs.AES.decrypt(name, PASSWORD_ENCRIPT).toString(crytojs.enc.Utf8);
    }
    return null;
  }

  /**
   * Actualiza la variable de sesion del sucursl
   * @param sucursal ID sucursal
   */
  updateSesionSucursal(sucursal: number) {
    sessionStorage.removeItem('suc');
    sessionStorage.setItem('suc', this.encrypt(sucursal + ''));
  }

  /**
   * Valida el núero de documento de acuerdo al tipo de documento Cedula, RUC, Pasaporte
   * @param type tipo de documento 1:CEDULA 2:RUC 3:PASAPORTE
   * @param documento número de documento
   * @returns
   */
  validateIdentityDocument(type: 1 | 2 | 3, documento: string): boolean {
    let correcto = false;
    if (type === 1) {
      correcto = this.validateIdentityCard(documento);
      if (!correcto) {
        this.addWarningMessage('Número de <strong>CÉDULA</strong> es incorrecto, ingrese uno válido.');
      }
    } else if (type === 2) {
      correcto = this.validarRucPersonaNatural(documento);
      //console.log('RUC personal ',correcto)
      if (!correcto) {
        correcto = this.validarRucSociedadPrivada(documento);
        //console.log('RUC privada ',correcto)
      }
      if (!correcto) {
        correcto = this.validarRucPublica(documento);
        //console.log('RUC publica ',correcto)
      }
      if (!correcto) {
        this.addWarningMessage('Número de <strong>RUC</strong> es incorrecto, ingrese uno válido.');
      }
    } else {
      correcto = true;
    }
    return correcto;
  }

  /**
   * Valida el número de cedula
   * @param cedula número de cedula
   * @returns
   */
  validateIdentityCard(cedula: string): boolean {
    let valido = false;

    if (!cedula || cedula.length !== 10) {
      return false;
    }
    const prov = parseInt(cedula.substring(0, 2), 10);

    if (!(prov > 0 && prov <= this._provincias)) {
      return false;
    }

    const d = [];

    for (let i = 0; i < 10; i++) {
      d[i] = parseInt(cedula.charAt(i) + '', 10);
    }

    let imp = 0;
    let par = 0;

    for (let i = 0; i < d.length; i += 2) {
      d[i] = ((d[i] * 2) > 9) ? ((d[i] * 2) - 9) : (d[i] * 2);
      imp += d[i];
    }

    for (let i = 1; i < (d.length - 1); i += 2) {
      par += d[i];
    }
    const suma = imp + par;
    const sum: string = suma + 10 + '';
    const sumastring = sum;
    let d10 = parseInt(sumastring.substring(0, 1) + '0', 10) - suma;
    d10 = (d10 === 10) ? 0 : d10;
    valido = d10 === d[9];
    return valido;
  }

  /**
   * Valida el numero de RUC
   * @param ruc número de RUC
   * @returns
   */
  validateRuc(ruc: string): boolean {
    let correcto = false;
    correcto = this.validarRucPersonaNatural(ruc);
    if (!correcto) {
      correcto = this.validarRucSociedadPrivada(ruc);
    }
    if (!correcto) {
      correcto = this.validarRucPublica(ruc);
    }
    if (!correcto) {
      this.addWarningMessage('Número de <strong>RUC</strong> es incorrecto, ingrese uno válido.');
    }
    return correcto;
  }

  /**
   * Verifica si el número de ruc es válido
   * @param ruc
   * @returns
   */
  isRucValid(ruc: string) {
    let correcto = false;
    correcto = this.validarRucPersonaNatural(ruc);
    if (!correcto) {
      correcto = this.validarRucSociedadPrivada(ruc);
    }
    if (!correcto) {
      correcto = this.validarRucPublica(ruc);
    }
    return correcto;
  }

  private validarRucPersonaNatural(cedula: string): boolean {
    let valido = false;
    //console.log(cedula);
    if (!cedula || cedula.length !== 13) {
      return false;
    }
    if (!cedula.endsWith('001')) {
      return false;
    }
    const prov = parseInt(cedula.substring(0, 2), 10);
    //console.log(prov);
    if (!(prov > 0 && prov <= this._provincias)) {
      return false;
    }
    const d = [];

    // console.log('longuitud de d ', d.length);
    for (let i = 0; i < 10; i++) {
      d[i] = parseInt(cedula.charAt(i) + '', 10);
    }

    let imp = 0;
    let par = 0;

    for (let i = 0; i < d.length; i += 2) {
      d[i] = ((d[i] * 2) > 9) ? ((d[i] * 2) - 9) : (d[i] * 2);
      imp += d[i];
    }

    for (let i = 1; i < (d.length - 1); i += 2) {
      par += d[i];
    }
    const suma = imp + par;
    const sum: string = suma + 10 + '';
    const sumastring = sum;
    let d10 = parseInt(sumastring.substring(0, 1) + '0', 10) - suma;
    d10 = (d10 === 10) ? 0 : d10;
    valido = d10 === d[9];
    return valido;
  }

  private validarRucSociedadPrivada(ruc: string): boolean {

    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const constante = 11;
    let respDato = false;
    const prov = parseInt(ruc.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this._provincias)) {
      return false;
    }
    const d = [];
    let suma = 0;
    for (let i = 0; i < d.length; i++) {
      d[i] = parseInt(ruc.charAt(i) + '', 10);
    }
    for (let i = 0; i < d.length - 1; i++) {
      d[i] = d[i] * coeficientes[i];
      suma += d[i];
    }
    let aux = 0;
    let resp = 0;

    aux = suma % constante;
    resp = constante - aux;

    resp = (aux === 0) ? 0 : resp;

    respDato = resp === d[9];
    return respDato;
  }

  private validarRucPublica(ruc: string): boolean {
    let resp = false;
    const prov = parseInt(ruc.substring(0, 2), 10);
    if (!(prov > 0 && prov <= this._provincias)) {
      return false;
    }
    let v1: number;
    let v2: number;
    let v3: number;
    let v4: number;
    let v5: number;
    let v6: number;
    let v7: number;
    let v8: number;
    let v9: number;
    let sumatoria: number;
    let modulo: number;
    let digito: number;
    const d = [];
    for (let i = 0; i < ruc.length; i++) {
      d[i] = parseInt(ruc.charAt(i) + '', 10);
    }
    v1 = d[0] * 3;
    v2 = d[1] * 2;
    v3 = d[2] * 7;
    v4 = d[3] * 6;
    v5 = d[4] * 5;
    v6 = d[5] * 4;
    v7 = d[6] * 3;
    v8 = d[7] * 2;
    v9 = d[8];
    sumatoria = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
    modulo = sumatoria % 11;
    if (modulo === 0) {
      return true;
    }
    digito = 11 - modulo;

    resp = digito === v9;
    return resp;
  }

  clearSessionStore() {
    sessionStorage.removeItem('accessToken');
  }

  /**
   * valida si un email o correo es válido
   * @param email
   * @returns
   */
  isEmailValid(email: string): boolean {
    // var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regex = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    return regex.test(email) ? true : false;
  }


  show(): void {
    this.subject$.next(true);
  }
  hide(): void {
    this.subject$.next(false);
  }
  listenLoading(): Observable<boolean> {
    return this.subject$.asObservable();
  }

  generatedPassword() {
    let pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789@#$';
    for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    return pass;
  }

  encontrarDuplicados(obj: any, campo?: string) {
    let duplicados = [];

    for (let i = 0; i < obj.length; ++i) {
      const uno = obj.slice(i);


      /*   if(uno.filter(ob=>ob.nro_distrito==obj[i].nro_distrito).length>1 && duplicados.filter(ob=>ob.nro_distrito==obj[i].nro_distrito).length==0){
  
            duplicados.push(obj[i].nro_distrito);
        } */

      if (uno.filter(ob => ob[campo] == obj[i][campo]).length > 1 && duplicados.filter(ob => ob[campo] == obj[i][campo]).length == 0) {

        duplicados.push(obj[i][campo]);
      }
    }


    return duplicados;
  }


  //TODO: toastr

  toast_success(mensaje: string, titulo?: string) {
    let title = 'Exito';
    if (titulo) {
      title = titulo;
    }
    this._toastr.success(mensaje, title);
  }
  toast_info(mensaje: string, titulo?: string) {
    let title = 'Información';
    if (titulo) {
      title = titulo;
    }
    this._toastr.info(mensaje, title);
  }
  toast_warning(mensaje: string, titulo?: string) {
    let title = 'Advertencia';
    if (titulo) {
      title = titulo;
    }
    this._toastr.warning(mensaje, title);
  }
  toast_error(mensaje: string, titulo?: string) {
    let title = 'Error';
    if (titulo) {
      title = title;
    }
    this._toastr.error(mensaje, title);
  }

  addLoadingMessage(message: string, icon: 'success' | 'error', callback, title?: string) {
    let timerInterval
    Swal.fire({
      title: 'Auto close alert!',
      html: message,
      icon: icon,
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = String(toInteger(Swal.getTimerLeft() / 1000));
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        callback();
      }
    })

  }

  extraerCaracteres(text: string): string {
    let letras = ''
    if (text) {
      letras = text.charAt(0);
      if (text.indexOf(' ') !== -1) {
        text = text.substring(text.indexOf(' ') + 1, text.length);
        letras += text.charAt(0);
      }
    }
    return letras;
  }
  

}
