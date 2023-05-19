import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionarEmpresaComponent } from './seleccionar-empresa/seleccionar-empresa.component';
import { TreeModule } from 'primeng/tree';
import { ModalCoreModule } from '../../../../../../projects/libreria/src/public-api';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    SeleccionarEmpresaComponent
  ],
  imports: [
    CommonModule,
    ModalCoreModule,
    TreeModule,
    ButtonModule,
  ],
  exports: [
    SeleccionarEmpresaComponent
  ]
})
export class ComponentsModule { }
