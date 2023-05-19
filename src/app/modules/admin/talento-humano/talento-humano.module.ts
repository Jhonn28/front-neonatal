import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentoHumanoRoutingModule } from './talento-humano-routing.module';
import { NumeroSalaComponent } from './pages/numero-sala/numero-sala.component';
import { MenuBarModule, TableCoreModule } from '../../../../../projects/libreria/src/public-api';
import { MesComponent } from './pages/mes/mes.component';
import { AreaSaludComponent } from './pages/area-salud/area-salud.component';



@NgModule({
  declarations: [
     NumeroSalaComponent,
     MesComponent,
     AreaSaludComponent
  ],
  imports: [
    CommonModule,
    TalentoHumanoRoutingModule,
    TableCoreModule,
    MenuBarModule

  ]
})
export class TalentoHumanoModule { }
