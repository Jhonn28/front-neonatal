import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesRoutingModule } from './opciones-routing.module';
import { OpcionesComponent } from './opciones.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { MenuBarModule, TableCoreModule, TreeCoreModule } from '../../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    OpcionesComponent
  ],
  imports: [
    CommonModule,
    OpcionesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FuseHighlightModule,
    FuseAlertModule,
    FuseScrollResetModule,
    TableCoreModule,
    TreeCoreModule,
    MenuBarModule
  ]
})
export class OpcionesModule { }
