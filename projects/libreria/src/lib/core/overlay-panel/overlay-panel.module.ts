import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelComponent } from './overlay-panel.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [OverlayPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    FieldsetModule,
    DropdownModule,
    InputTextModule
  ],
  exports: [
    OverlayPanelComponent
  ]
})
export class OverlayPanelCoreModule { }
