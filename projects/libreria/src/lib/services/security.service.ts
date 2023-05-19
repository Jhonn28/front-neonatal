import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, finalize } from 'rxjs/operators';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { MethodsService } from './methods.service';
import { User } from '../types';
import { Condition, IResultData } from '../interfaces';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    userData: User;


    constructor(private http: HttpClient, private _methodService: MethodsService, private _utilService: UtilsService) { }

    getColumnsTable(tablename: string, primaryfield: string, uidOption: number, tablenumber: number): Observable<Object> {
        tablename = tablename.toLowerCase();
        const pageNumber = 1;
        const pageSize = 10;
        const body = { tablename, primaryfield, uidOption, tablenumber, pageNumber, pageSize };
        return this._methodService.post('seguridad/columnas', body).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                // this.utilitarioSvc.agregarMensajeErrorEndpoint(err);
                return throwError(err);
            })
        );
    }

    getConsultTable(tablename: string, orderfield: string, condition: Condition[], query: string, pageNumber?: number, pageSize?: number): Observable<IResultData> {
        tablename = tablename.toLowerCase();
        orderfield = orderfield.toLowerCase();
        const body = { tablename, orderfield, condition, pageNumber, pageSize, query };
        // console.log(body);
        return this._methodService.post('seguridad/consultar-tabla', body).pipe(
            map((res: IResultData) => {
                return res;
            }),
            catchError(err => {
                //console.log(err);
                return throwError(err);
            })
        );
    }

    getDropdownService(service: string, body?: any): Observable<IResultData> {
        if (body) {
            return this._methodService.post(service, body).pipe(
                map((res: IResultData) => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err);
                })
            );
        } else {
            return this._methodService.get(service).pipe(
                map((res: IResultData) => {
                    return res;
                }),
                catchError(err => {
                    return throwError(err);
                })
            );
        }
    }

    getDropdownTable(tableName: string, primaryField: string, nameField: string, condition?: Condition[]): Observable<IResultData> {
        // console.log('recibo ',tableName, primaryField, nameField ,condition);
        tableName = tableName.toLowerCase(); // pg estandar para tablas
        primaryField = primaryField.toLowerCase(); // pg estandar para tablas
        nameField = nameField.toLowerCase(); // pg estandar para tablas
        if (condition === undefined || condition === null) {
            condition = [];
        }
        const body = {
            tableName,
            primaryField,
            nameField,
            condition
        };
        // console.log(body);
        return this._methodService.post('seguridad/combo', body).pipe(
            map((res: IResultData) => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    getAutocompleteService(service: string, body?: any): Observable<IResultData> {
        // console.log('Autocompletar servicios >> ', service, ' >>> ', body);
        if (body) {
            return this._methodService.post(service, body).pipe(
                map((res: IResultData) => {
                    return res.data;
                }),
                catchError(err => {
                    return throwError(err);
                })
            );
        } else {
            return this._methodService.get(service).pipe(
                map((res: IResultData) => {
                    // console.log('Autocompletar respueta >> ', res);
                    return res.data;
                }),
                catchError(err => {
                    return throwError(err);
                })
            );
        }

    }

    getConsultTree(tableName: string, primaryField: string, nameField: string, fatherField: string, orderField: string, condition: Condition[]): Observable<any> {
        tableName = tableName.toLowerCase(); // pg estandar para tablas
        primaryField = primaryField.toLowerCase(); // pg estandar para tablas
        nameField = nameField.toLowerCase(); // pg estandar para tablas
        orderField = orderField.toLowerCase(); // pg estandar para tablas
        const body = {
            tableName,
            orderField,
            condition,
            primaryField,
            nameField,
            fatherField,
        };
        return this._methodService.post('seguridad/consultar-arbol', body).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    isDelete(tableName: string, primaryField: string, valuePrimaryField: any): Observable<any> {
        tableName = tableName.toLowerCase(); // pg estandar para tablas
        primaryField = primaryField.toLowerCase(); // pg estandar para tablas
        const body = {
            tableName,
            primaryField,
            valuePrimaryField
        };
        return this._methodService.post('seguridad/eliminar', body).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    isUnique(tableName: string, field: string, valueField: any): Observable<any> {
        tableName = tableName.toLowerCase(); // pg estandar para tablas
        field = field.toLowerCase(); // pg estandar para tablas
        const body = {
            tableName,
            field,
            valueField
        };
        //TODO: Validar este envio OJO
        return this._methodService.post('seguridad/isUnico', body).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    getRules(): Observable<any> {
        const profile = 1;
        return this._methodService.get(`seguridad/reglas-password/${profile}`,).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return throwError(err);
            })
        );
    }


    /**
     * Retorn los datos de un json
     * @param ruta ruta del archivo JSON
     * @returns : Promise<any[]>
     */
    getJsonFile(ruta: string): Promise<any[]> {
        return this.http.get<any>(`${ruta}`)
            .toPromise()
            .then(res => res.data as any[])
            .then(datos => datos);
    }


    /**
       * Get the current logged in user data
       */
    getUser(): Observable<any> {
        const user = 1;

        return this._methodService.get(`seguridad/usuario/${user}`).pipe(
            tap((user: IResultData) => {
                const { ide_segusu, correo_segusu } = user.data;
                this._user.next(user.data);
            })
        );
    }


    /**
       * Setter & getter for user
       *
       * @param value
       */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    getConsultSelectTable(service: string) {
        this._utilService.showSpinner();
        return this._methodService.get(service).pipe(
            finalize(() => this._utilService.hideSpinner()),
            map((res: IResultData) => {
                return res.data;
            }),
            catchError(err => {
                return throwError(err);
            })
        )
    }

    get menu(): any {
        if (sessionStorage.getItem('menu')) {
            const menu = this._utilService.decrypt(sessionStorage.getItem('menu'));
            return JSON.parse(menu);
        }
        return [];
    }

}
