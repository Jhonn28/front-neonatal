import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchComponent } from './branch.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    BranchComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    BranchComponent
  ]
})
export class BranchModule { }
