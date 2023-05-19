import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { Observable, forkJoin, of } from 'rxjs';
import { SystemService } from '../../../../../../projects/libreria/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class DosResolver implements Resolve<boolean> {
  constructor(
    private _indicadorService: IndicadorService,
    private _systemService: SystemService,

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
      this._indicadorService.getTiempo(),
      this._indicadorService.getIndicador({ide:'ide_thas',campo:'detalle_thas',tabla:'th_area_salud'})
    ]);
  }
}
