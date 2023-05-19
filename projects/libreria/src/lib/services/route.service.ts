import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private _utilService: UtilsService) { }

  initRouteConfig(appName?: string): void {
    console.log(this._utilService.isUndefined(appName));
    if (!this._utilService.isUndefined(appName)) {
      appName = 'Business';
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap(route => route.data),
      map(data => data['title']))
      .subscribe(dataTitle => {
        if (dataTitle) {
          appName += '' + dataTitle;
        }
        this.title.setTitle(appName)
      });
  }
}
