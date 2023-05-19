import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinciaRoutingModule } from './provincia-routing.module';
import { ProvinciaComponent } from './provincia.component';
import { TableCoreModule } from '../../../../../../../projects/libreria/src/lib/core/table/table.module';
import { MenuBarModule } from '../../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';


@NgModule({
  declarations: [
    ProvinciaComponent
  ],
  imports: [
    CommonModule,
    ProvinciaRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class ProvinciaModule { }
