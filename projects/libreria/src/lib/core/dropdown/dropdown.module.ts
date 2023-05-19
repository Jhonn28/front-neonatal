import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownCoreComponent } from './dropdown.component';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    DropdownCoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    DropdownCoreComponent
  ],
})
export class DropdownCoreModule { }
