import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnoARoutingModule } from './uno-a-routing.module';
import { UnoAComponent } from './uno-a.component';
import { MenuBarModule, TableCoreModule } from '../../../../../../projects/libreria/src/public-api';


@NgModule({
  declarations: [
    UnoAComponent
  ],
  imports: [
    CommonModule,
    UnoARoutingModule,
    TableCoreModule,
    MenuBarModule
  ]
})
export class UnoAModule { }
