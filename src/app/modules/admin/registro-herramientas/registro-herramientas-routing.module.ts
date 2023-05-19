import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoAComponent } from './uno-a/uno-a.component';
import { UnoAResolver } from './resolvers/uno-a.resolver';
import { DosComponent } from './dos/dos.component';
import { DosResolver } from './resolvers/dos.resolver';
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
  {path:'uno-a',component:UnoAComponent,resolve:{info: UnoAResolver}},
  {path:'dos',component: DosComponent,resolve:{info: DosResolver}},
  {path: 'tres-a',component:TresAComponent,resolve:{info: DosResolver}},
  {path: 'tres-b',component:TresBComponent,resolve:{info: DosResolver}},
  {path: 'cuatro',component:CuatroComponent,resolve:{info: DosResolver}},
  {path: 'cinco',component:CincoComponent,resolve:{info: DosResolver}},
  {path: 'seis',component:SeisComponent,resolve:{info: DosResolver}},
  {path: 'siete-a',component:SieteAComponent,resolve:{info: DosResolver}},
  {path: 'siete-b',component:SieteBComponent,resolve:{info: DosResolver}},
  {path: 'ocho',component:OchoComponent,resolve:{info: DosResolver}},
  {path: 'ocho-a',component:OchoAComponent,resolve:{info: DosResolver}},
  {path: 'ocho-b',component:OchoBComponent,resolve:{info: DosResolver}},
  {path: 'ocho-c',component:OchoCComponent,resolve:{info: DosResolver}},
  {path: 'ocho-d',component:OchoDComponent,resolve:{info: DosResolver}},
  {path: 'ocho-e',component:OchoEComponent,resolve:{info: DosResolver}},
  {path: 'ocho-f',component:OchoFComponent,resolve:{info: DosResolver}},
  {path: 'nueve-a',component:NueveAComponent,resolve:{info: DosResolver}},
  {path: 'nueve-b',component:NueveBComponent,resolve:{info: DosResolver}},
  {path: 'nueve-c',component:NueveCComponent,resolve:{info: DosResolver}},
  {path: 'diez',component:DiezComponent,resolve:{info: DosResolver}},
  {path: 'once',component:OnceComponent,resolve:{info: DosResolver}},
  {path: 'doce',component:DoceComponent,resolve:{info: DosResolver}},
  {path: 'trece',component:TreceComponent,resolve:{info: DosResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroHerramientasRoutingModule { }
