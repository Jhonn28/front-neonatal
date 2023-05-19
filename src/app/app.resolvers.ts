import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { SecurityService } from '../../projects/libreria/src/public-api';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
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
        private _securityService: SecurityService
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
        console.log('ejecuto el resolver');
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            // this._securityService.getMenu(),
            // this._securityService.getUser()
            /* this._messagesService.getAll(),
            this._notificationsService.getAll(),
            this._shortcutsService.getAll(),
            this._userService.get() */
        ]);
    }
}
