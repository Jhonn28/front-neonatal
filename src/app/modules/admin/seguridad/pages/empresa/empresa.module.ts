import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { MenuBarModule, TableCoreModule } from '../../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class EmpresaModule { }
