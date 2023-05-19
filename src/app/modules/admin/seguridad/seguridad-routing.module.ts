import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'correo', loadChildren: () => import('./pages/correo/correo.module').then(m => m.CorreoModule) },
      { path: 'establecimientos', loadChildren: () => import('./pages/empresa/empresa.module').then(m => m.EmpresaModule) },
      { path: 'opciones', loadChildren: () => import('./pages/opciones/opciones.module').then(m => m.OpcionesModule) },
      { path: 'parametros', loadChildren: () => import('./pages/parametros/parametros.module').then(m => m.ParametrosModule) },
      { path: 'permisos', loadChildren: () => import('./pages/permisos/permisos.module').then(m => m.PermisosModule) },
      { path: 'reglas-clave', loadChildren: () => import('./pages/reglas-clave/reglas-clave.module').then(m => m.ReglasClaveModule) },
      { path: 'usuario', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
