import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, NoAuthGuard,  } from '../../../../projects/libreria/src/public-api';
import { LayoutComponent } from '../../layout/layout.component';
import { HomeResolver } from './home/home.resolvers';
import { PermissionsGuard } from '../../../../projects/libreria/src/lib/guards/security.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: {
      layout: 'empty'
    },

  },
  {
    path: 'private',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard, PermissionsGuard],
    component: LayoutComponent,
    children: [
      { path: 'error', loadChildren: () => import('app/modules/admin/error/error.module').then(m => m.ErrorModule) },

      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), resolve: { info: HomeResolver } },
      { path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule) },
      { path: 'seguridad', loadChildren: () => import('app/modules/admin/seguridad/seguridad.module').then(m => m.SeguridadModule) },
      {path: 'configuracion', loadChildren:() => import('app/modules/admin/talento-humano/talento-humano.module').then(m=>m.TalentoHumanoModule)},
      {path: 'indicadores', loadChildren:() => import('app/modules/admin/indicadores/indicadores.module').then(m=>m.IndicadoresModule)},
      {path:'registro-herramienta',loadChildren:()=> import('app/modules/admin/registro-herramientas/registro-herramientas.module').then(m=>m.RegistroHerramientasModule)},
      {path:'actualizar-herramienta',loadChildren:()=> import('app/modules/admin/actualizar-herramientas/actualizar-herramientas.module').then(m=>m.ActualizarHerramientasModule)},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
