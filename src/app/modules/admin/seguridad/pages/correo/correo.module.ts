import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorreoRoutingModule } from './correo-routing.module';
import { CorreoComponent } from './correo.component';
import { MenuBarModule, TableCoreModule } from '../../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    CorreoComponent
  ],
  imports: [
    CommonModule,
    CorreoRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class CorreoModule { }
