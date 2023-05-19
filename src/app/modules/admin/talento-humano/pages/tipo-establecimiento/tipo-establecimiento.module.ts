import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEstablecimientoRoutingModule } from './tipo-establecimiento-routing.module';
import { TipoEstablecimientoComponent } from './tipo-establecimiento.component';
import { MenuBarModule } from '../../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';
import { TableCoreModule } from '../../../../../../../projects/libreria/src/lib/core/table/table.module';


@NgModule({
  declarations: [
    TipoEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    TipoEstablecimientoRoutingModule,
    MenuBarModule,
    TableCoreModule
  ]
})
export class TipoEstablecimientoModule { }
