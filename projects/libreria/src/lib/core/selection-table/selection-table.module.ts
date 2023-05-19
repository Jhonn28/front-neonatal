import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionTableComponent } from './selection-table.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    SelectionTableComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    FieldsetModule,
    DropdownModule,
    InputTextModule
  ],
  exports: [
    SelectionTableComponent
  ]
})
export class SelectionTableCoreModule { }
