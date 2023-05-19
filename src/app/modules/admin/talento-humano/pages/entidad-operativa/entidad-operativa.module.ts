import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadOperativaRoutingModule } from './entidad-operativa-routing.module';
import { EntidadOperativaComponent } from './entidad-operativa.component';
import { MenuBarModule } from '../../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';
import { TableCoreModule } from '../../../../../../../projects/libreria/src/lib/core/table/table.module';


@NgModule({
  declarations: [
    EntidadOperativaComponent
  ],
  imports: [
    CommonModule,
    EntidadOperativaRoutingModule,
    MenuBarModule,
    TableCoreModule
  ]
})
export class EntidadOperativaModule { }
