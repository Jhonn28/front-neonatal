import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { TalentoHumanoService } from 'app/services/talento-humano.service';
import { Observable, of, forkJoin } from 'rxjs';
import { SystemService, UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { IndicadorService } from 'app/services/indicador.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralResolver implements Resolve<boolean> {
  constructor(
    private _talentoHumanoService: TalentoHumanoService,
    private _utilService: UtilsService,
    private _systemService: SystemService,
    private _indicadorService: IndicadorService

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
      this._talentoHumanoService.getDistritos(),
      this._talentoHumanoService.getEstablecimientoDistrito(this._utilService.getEmpresa()),
      this._systemService.getInfoSucursal(),
      this._indicadorService.getTiempo(),
      this._indicadorService.getIndicador({ide:'ide_thas',campo:'detalle_thas',tabla:'th_area_salud'})

    ]);
  }
}
