import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ButtonCoreModule, TableCoreModule, MenuBarModule } from '../../../../../../../projects/libreria/src/public-api';
import { FuseAlertModule } from '@fuse/components/alert';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ButtonCoreModule,
    TableCoreModule,
    MenuBarModule,
    FuseAlertModule,
    TabViewModule
  ]
})
export class UsuariosModule { }
