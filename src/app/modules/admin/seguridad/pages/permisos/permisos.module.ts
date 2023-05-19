import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { MenuBarModule, TableCoreModule } from '../../../../../../../projects/libreria/src/public-api';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    PermisosComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    TableCoreModule,
    MenuBarModule,
    TabViewModule
  ]
})
export class PermisosModule { }
