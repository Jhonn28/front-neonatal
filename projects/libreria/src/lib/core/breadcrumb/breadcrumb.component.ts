import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService, UtilsService } from '../../services';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgxCoreBreadcrumbComponent implements OnInit {

  menu = [];

  breadcrumbs = [];

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _utilService: UtilsService) { }

  ngOnInit(): void {
    let ruta = this._router.url;
    let route = this._activatedRoute;
    this.menu = ruta.split('/').slice(2);
    //const newd = ruta.replace('/admin/', "");
    /* console.log(newd)
    console.log(ruta, this.busquedaPadre(newd))

    console.log(this.breadcrumbs) */

    //console.log(route.snapshot.queryParamMap.get('layout'))
  }

  private busquedaPadre(ide_opci: string): any {
    this.menu = this.navegation();
    for (const opciActual of this.menu) {
      const encontro = this.busquedaRecursivaOpcion(opciActual, ide_opci);
      if (encontro !== null) {
        return encontro;
      }
    }
  }


  private busquedaRecursivaOpcion(opcion: any, ide_opci: string): any {
    if (opcion.link === ide_opci) {
      this.menu.unshift(opcion);
      return opcion;
    }
    if (opcion.children) {
      //console.log('padre => ', opcion.title)
      for (const opciActual of opcion.children) {
        const encontro = this.busquedaRecursivaOpcion(opciActual, ide_opci);
        if (encontro !== null) {
          return encontro;
        } /* else {
          console.log('no se encontro aqui ===> en este menu ==> ', opcion.title)
          //this.breadcrumbs = []
        } */
      }

      //this.breadcrumbs.indexOf({value: opcion.title})
    }
    return null;
  }

  navegation(): any {
    if (sessionStorage.getItem('menu')) {
      const menu = this._utilService.decrypt(sessionStorage.getItem('menu'));
      return JSON.parse(menu);
    }
    return [];
  }

  private removeItemFromArray(arr: any, item: any) {

    console.log(arr, item)

    const i = arr.indexOf(item);
    console.log(i)
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

}
