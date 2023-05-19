import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableCoreComponent } from './table.component';

// primeng
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SkeletonModule} from 'primeng/skeleton';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {FileUploadModule} from 'primeng/fileupload';
import {TreeTableModule} from 'primeng/treetable';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';

import { PipesModule } from '../../pipes/pipes.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';

// material


@NgModule({
  declarations: [
    TableCoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ContextMenuModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    AutoCompleteModule,
    SkeletonModule,
    DropdownModule,
    PaginatorModule,
    PipesModule,
    FileUploadModule,
    TreeTableModule,
    ImageViewerModule,
    RadioButtonModule,
    SelectButtonModule,
    AvatarModule,
    BadgeModule,
    DynamicDialogModule,
    CalendarModule,
    PasswordModule
  ],
  exports: [
    TableCoreComponent
  ],
})
export class TableCoreModule { }
