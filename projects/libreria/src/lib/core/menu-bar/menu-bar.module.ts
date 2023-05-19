import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { ButtonCoreModule } from '../button/button.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {ButtonModule} from 'primeng/button';
import {  NgxCoreBreadcrumbModule } from '../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    ButtonCoreModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule,
    NgxCoreBreadcrumbModule
  ],
  exports: [
    MenuBarComponent
  ],
})
export class MenuBarModule { }
