import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglasClaveRoutingModule } from './reglas-clave-routing.module';
import { ReglasClaveComponent } from './reglas-clave.component';
import { MenuBarModule, TableCoreModule } from '../../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    ReglasClaveComponent
  ],
  imports: [
    CommonModule,
    ReglasClaveRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class ReglasClaveModule { }
