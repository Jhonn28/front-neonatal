import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NivelAtencionRoutingModule } from './nivel-atencion-routing.module';
import { NivelAtencionComponent } from './nivel-atencion.component';
import { TableCoreModule } from '../../../../../../../projects/libreria/src/lib/core/table/table.module';
import { MenuBarModule } from '../../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';


@NgModule({
  declarations: [
    NivelAtencionComponent
  ],
  imports: [
    CommonModule,
    NivelAtencionRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class NivelAtencionModule { }
