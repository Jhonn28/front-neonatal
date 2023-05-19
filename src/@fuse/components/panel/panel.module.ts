import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FusePanelComponent } from './panel.component';
import { FuseNavigationModule } from '../navigation';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseHighlightModule } from '../highlight';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';



@NgModule({
  declarations: [
    FusePanelComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    FuseHighlightModule,
    FuseScrollResetModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    FusePanelComponent
  ],
})
export class FusePanelModule { }
