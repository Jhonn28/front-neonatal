import { NgModule } from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotFoundComponent } from './not-found/not-found.component';
import {CommonRoutingModule} from './common-routing.module';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {UnderMaintenanceComponent} from './under-maintenance/under-maintenance.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    AccessDeniedComponent,
    UnderMaintenanceComponent
  ],
  imports: [
    NgCommonModule,
    CommonRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CommonModule { }
