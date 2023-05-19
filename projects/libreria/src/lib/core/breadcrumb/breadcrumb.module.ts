import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgxCoreBreadcrumbComponent } from './breadcrumb.component';



@NgModule({
  declarations: [
    NgxCoreBreadcrumbComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    NgxCoreBreadcrumbComponent
  ]
})
export class NgxCoreBreadcrumbModule { }
