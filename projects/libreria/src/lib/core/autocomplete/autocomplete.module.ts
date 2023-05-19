import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteCoreComponent } from './autocomplete.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutocompleteCoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule
  ],
  exports: [
    AutocompleteCoreComponent
  ],
})
export class AutocompleteCoreModule { }
