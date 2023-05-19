import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCoreComponent } from './tree.component';
import {TreeModule} from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import {ContextMenuModule} from 'primeng/contextmenu';
import {SkeletonModule} from 'primeng/skeleton';

@NgModule({
  declarations: [
    TreeCoreComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ContextMenuModule,
    TreeModule,
    SkeletonModule
  ],
  exports: [
    TreeCoreComponent
  ],
})
export class TreeCoreModule { }
