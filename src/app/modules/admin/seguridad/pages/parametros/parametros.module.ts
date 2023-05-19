import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { ParametrosComponent } from './parametros.component';
import { ButtonCoreModule, TableCoreModule } from '../../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ButtonCoreModule,
    TableCoreModule
  ]
})
export class ParametrosModule { }
