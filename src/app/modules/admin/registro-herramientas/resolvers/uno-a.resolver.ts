import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { SystemService, UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { IndicadorService } from 'app/services/indicador.service';

@Injectable({
  providedIn: 'root'
})
export class UnoAResolver implements Resolve<boolean> {
  constructor(
    private _indicadorService: IndicadorService,
    private _systemService: SystemService,
    private _utilService: UtilsService

  ) {
  }

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([
      this._systemService.getInfoSucursal(),
      this._indicadorService.getNumeroSala(),
      this._indicadorService.getTiempo()

    ]);
  }
}
