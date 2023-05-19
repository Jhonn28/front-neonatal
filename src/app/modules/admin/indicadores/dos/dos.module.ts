import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DosRoutingModule } from './dos-routing.module';
import { DosComponent } from './dos.component';
import { MenuBarModule } from '../../../../../../projects/libreria/src/lib/core/menu-bar/menu-bar.module';
import { TableCoreModule } from '../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    DosComponent
  ],
  imports: [
    CommonModule,
    DosRoutingModule,
    MenuBarModule,
    TableCoreModule
  ]
})
export class DosModule { }
