import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import {TooltipModule} from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    IconsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    PipesModule,
    PaginatorModule,
    InputTextModule
  ],
  exports: [
    IconsComponent
  ],
})
export class IconsCoreModule { }
