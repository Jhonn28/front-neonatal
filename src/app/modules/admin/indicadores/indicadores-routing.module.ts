import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CincoComponent } from './cinco/cinco.component';
import { SeisComponent } from './seis/seis.component';
import { TresComponent } from './tres/tres.component';
import { OchoComponent } from './ocho/ocho.component';
import { NueveComponent } from './nueve/nueve.component';

const routes: Routes = [
  {path: 'uno-a', loadChildren:() => import('./uno-a/uno-a.module').then(m=>m.UnoAModule)},
  {path: 'dos', loadChildren:() => import('./dos/dos.module').then(m=>m.DosModule)},
  //{path: 'tres-a', loadChildren:() => import('./tres-a/tres-a.module').then(m=>m.TresAModule)},
  {path:'tres',component:TresComponent},
  {path:'cinco',component: CincoComponent},
  {path:'seis',component:SeisComponent},
  {path:'ocho',component: OchoComponent},
  {path:'nueve',component: NueveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicadoresRoutingModule { }
