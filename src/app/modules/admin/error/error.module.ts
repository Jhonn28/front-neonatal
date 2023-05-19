import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ErrorRoutingModule } from './error-routing.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ErrorModule { }
