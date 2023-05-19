import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCoreComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import { IconsCoreModule } from '../../components/icons';

@NgModule({
  declarations: [
    ButtonCoreComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
    IconsCoreModule
  ],
  exports: [
    ButtonCoreComponent
  ],
})
export class ButtonCoreModule { }
