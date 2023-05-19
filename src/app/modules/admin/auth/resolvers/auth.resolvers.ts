import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { SystemService, UtilsService } from '../../../../../../projects/libreria/src/public-api';


@Injectable({
    providedIn: 'root'
})
export class rulesPasswordResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        /* private _messagesService: MessagesService,
        private _navigationService: NavigationService,
        private _notificationsService: NotificationsService,
        private _shortcutsService: ShortcutsService,
        private _userService: UserService, */
        private _utilService: UtilsService,
        private _systemService: SystemService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        const token = route.queryParams['token'];
        if(!token){
            return;
        }

        const tokenDecode = this._utilService.decodeTokens(token);

        console.log('ejecuto el resolver', tokenDecode.per);
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._systemService.getRulesPassword(tokenDecode.per, token)
        ]);
    }
}
