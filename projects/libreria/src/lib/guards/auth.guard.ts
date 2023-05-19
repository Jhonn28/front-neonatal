import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _securityService: SecurityService,
    private _router: Router
  ) {
  }

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      return this._authService.validateToken()
        .pipe(
          tap((estaAutenticado) => {
            if (!estaAutenticado) {
              this.redirect();
            }
          })
        );
      // return true;
    }
    this.redirect();

  }

  redirect() {
    this._router.navigate(['/login']);
    return false;
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log(state.url);

    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._check(redirectUrl);
    //return true;
  }

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @private
   */
  private _check(redirectURL: string): Observable<boolean> {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {

          // If the user is not authenticated...
          if (!authenticated) {
            // Redirect to the sign-in page
            this._router.navigate(['login']);
            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }
}
