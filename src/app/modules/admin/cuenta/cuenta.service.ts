import { Injectable } from '@angular/core';
import { MethodsService } from '../../../../../projects/libreria/src/public-api';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IResultData } from '../../../../../projects/libreria/src/lib/interfaces/result.interface';
import { IPassword } from '../../../../../projects/libreria/src/lib/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private _methodsService: MethodsService) { }

    async changePassword(password: IPassword, user: number){

        return await this._methodsService.patch(`seguridad/actualizar-password/${user}`,password).pipe(
            map((res: IResultData) =>{
                return res;
            }),
            catchError((err: any) => {
                return throwError(err);
            })
        )
    }
}
