import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { MenuBarModule, TableCoreModule } from '../../../../../projects/libreria/src/public-api';
import { TresBComponent } from './tres/pages/tres-b/tres-b.component';
import { CincoComponent } from './cinco/cinco.component';
import { SeisComponent } from './seis/seis.component';
import { OchoAComponent } from './ocho/pages/ocho-a/ocho-a.component';
import { OchoBComponent } from './ocho/pages/ocho-b/ocho-b.component';
import { OchoCComponent } from './ocho/pages/ocho-c/ocho-c.component';
import { OchoEComponent } from './ocho/pages/ocho-e/ocho-e.component';
import { OchoFComponent } from './ocho/pages/ocho-f/ocho-f.component';
import { NueveAComponent } from './nueve/pages/nueve-a/nueve-a.component';
import { NueveBComponent } from './nueve/pages/nueve-b/nueve-b.component';
import { NueveCComponent } from './nueve/pages/nueve-c/nueve-c.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MatIconModule } from '@angular/material/icon';
import { TresComponent } from './tres/tres.component';
import { TresAComponent } from './tres/pages/tres-a/tres-a.component';
import { OchoComponent } from './ocho/ocho.component';
import { OchoDComponent } from './ocho/pages/ocho-d/ocho-d.component';
import { NueveComponent } from './nueve/nueve.component';


@NgModule({
  declarations: [
    TresComponent,
    TresAComponent,
    TresBComponent,
    CincoComponent,
    SeisComponent,

    OchoComponent,
    OchoAComponent,
    OchoBComponent,
    OchoCComponent,
    OchoEComponent,
    OchoDComponent,
    OchoFComponent,

    NueveAComponent,
    NueveBComponent,
    NueveCComponent,
    NueveComponent,
  ],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    TableCoreModule,
    MenuBarModule,

    MatSidenavModule,
    FuseNavigationModule,
    MatIconModule

  ]
})
export class IndicadoresModule { }
