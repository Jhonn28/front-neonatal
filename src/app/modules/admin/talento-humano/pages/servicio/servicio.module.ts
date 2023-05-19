import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { ServicioComponent } from './servicio.component';
import { TableCoreModule } from '../../../../../../../projects/libreria/src/lib/core/table/table.module';
import { MenuBarModule } from '../../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';


@NgModule({
  declarations: [
    ServicioComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class ServicioModule { }
