import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnoAComponent} from './uno-a/uno-a.component'
import { GeneralResolver } from './resolvers/general.resolver';
import { DosComponent } from './dos/dos.component';
import { TresAComponent } from './tres-a/tres-a.component';
import { TresBComponent } from './tres-b/tres-b.component';
import { CuatroComponent } from './cuatro/cuatro.component';
import { CincoComponent } from './cinco/cinco.component';
import { SeisComponent } from './seis/seis.component';
import { SieteAComponent } from './siete-a/siete-a.component';
import { SieteBComponent } from './siete-b/siete-b.component';
import { OchoComponent } from './ocho/ocho.component';
import { OchoAComponent } from './ocho-a/ocho-a.component';
import { OchoBComponent } from './ocho-b/ocho-b.component';
import { OchoCComponent } from './ocho-c/ocho-c.component';
import { OchoDComponent } from './ocho-d/ocho-d.component';
import { OchoEComponent } from './ocho-e/ocho-e.component';
import { OchoFComponent } from './ocho-f/ocho-f.component';
import { NueveAComponent } from './nueve-a/nueve-a.component';
import { NueveBComponent } from './nueve-b/nueve-b.component';
import { NueveCComponent } from './nueve-c/nueve-c.component';
import { DiezComponent } from './diez/diez.component';
import { OnceComponent } from './once/once.component';
import { DoceComponent } from './doce/doce.component';
import { TreceComponent } from './trece/trece.component';

const routes: Routes = [
  {path:'uno-a',component: UnoAComponent,resolve:{info:GeneralResolver}},
  {path:'dos',component: DosComponent,resolve:{info:GeneralResolver}},
  {path:'tres-a',component: TresAComponent,resolve:{info:GeneralResolver}},
  {path:'tres-b',component: TresBComponent,resolve:{info:GeneralResolver}},
  {path:'cuatro',component: CuatroComponent,resolve:{info:GeneralResolver}},
  {path:'cinco',component: CincoComponent,resolve:{info:GeneralResolver}},
  {path:'seis',component: SeisComponent,resolve:{info:GeneralResolver}},
  {path:'siete-a',component: SieteAComponent,resolve:{info:GeneralResolver}},
  {path:'siete-b',component: SieteBComponent,resolve:{info:GeneralResolver}},
  {path:'ocho',component: OchoComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-a',component: OchoAComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-b',component: OchoBComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-c',component: OchoCComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-d',component: OchoDComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-e',component: OchoEComponent,resolve:{info:GeneralResolver}},
  {path:'ocho-f',component: OchoFComponent,resolve:{info:GeneralResolver}},
  {path:'nueve-a',component: NueveAComponent,resolve:{info:GeneralResolver}},
  {path:'nueve-b',component: NueveBComponent,resolve:{info:GeneralResolver}},
  {path:'nueve-c',component: NueveCComponent,resolve:{info:GeneralResolver}},
  {path:'diez',component: DiezComponent,resolve:{info:GeneralResolver}},
  {path:'once',component: OnceComponent,resolve:{info:GeneralResolver}},
  {path:'doce',component: DoceComponent,resolve:{info:GeneralResolver}},
  {path:'trece',component: TreceComponent,resolve:{info:GeneralResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarHerramientasRoutingModule { }
