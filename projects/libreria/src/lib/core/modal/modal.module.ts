import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCoreComponent } from './modal.component';

import {DialogModule} from 'primeng/dialog';
import { ButtonCoreModule } from '../button/button.module';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    ModalCoreComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonCoreModule,
    ButtonModule,
    RippleModule
  ],
  exports: [
    ModalCoreComponent
  ]
})
export class ModalCoreModule { }
