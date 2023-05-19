/* import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.isAccessScreen(state.url)
      .pipe(
        switchMap((authorized) => {
          if (!authorized) {
            // Redirect to the unauthorized page
            console.log('no autorizado');
            this._router.navigate(['/private/no-autorizado']);
            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canLoad >> ', route, segments);
    return true;

  }
}
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivateChild {

  constructor(private _router: Router, private _authService: AuthService) { }

/*   async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    console.log('canactivate => ', state.url)
    return this._check(state.url);
  } */

  /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check(state.url);
  }

  private _check(url: string): Observable<boolean> {
    // Check the permission
    return this._authService.isAccessScreen(url).pipe(
      switchMap((permit) => {
        if (!permit) {
          this._router.navigate(['/', 'private','home']);
          return of(false)
        }
        // Allow the access
        return of(true);
      })
    )
  }

  redirect(): boolean {
    this._router.navigate(['/', 'common', 'access-denied']);
    return false;
  }

}
