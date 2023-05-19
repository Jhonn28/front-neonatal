import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumeroSalaComponent } from './pages/numero-sala/numero-sala.component';
import { MesComponent } from './pages/mes/mes.component';
import { AreaSaludComponent } from './pages/area-salud/area-salud.component';

const routes: Routes = [
  {path: 'provincia', loadChildren:()=> import('./pages/provincia/provincia.module').then(m=> m.ProvinciaModule)},
  {path: 'tipo-establecimiento', loadChildren:()=> import('./pages/tipo-establecimiento/tipo-establecimiento.module').then(m=>m.TipoEstablecimientoModule)},
  {path: 'nivel-atencion', loadChildren: ()=> import('./pages/nivel-atencion/nivel-atencion.module').then(m=>m.NivelAtencionModule)},
  {path: 'servicio', loadChildren: () => import('./pages/servicio/servicio.module').then(m=>m.ServicioModule)},
  {path: 'entidad-operativa', loadChildren: ()=> import('./pages/entidad-operativa/entidad-operativa.module').then(m=>m.EntidadOperativaModule)},
  {path:'numero-sala',component:NumeroSalaComponent},
  {path:'tiempo', component: MesComponent},
  {path:'area-salud',component: AreaSaludComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentoHumanoRoutingModule { }
