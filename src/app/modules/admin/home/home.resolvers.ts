import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { SystemService } from '../../../../../projects/libreria/src/lib/services/system.service';

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<any>
{
    constructor(
      private _systemService: SystemService
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
            this._systemService.getInfoSucursal()
           // this._systemService.getGeolocation(),
         ]);
    }
}
