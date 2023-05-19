import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerComponent } from './image-viewer.component';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [
    ImageViewerComponent
  ]
})
export class ImageViewerModule { }
