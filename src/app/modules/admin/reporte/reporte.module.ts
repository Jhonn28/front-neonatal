import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { DistritoComponent } from './distrito/distrito.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ZonalComponent } from './zonal/zonal.component';
import { TableModule } from 'primeng/table';
import { HistoricoComponent } from './historico/historico.component';
import { DistritoTrimestreComponent } from './distrito-trimestre/distrito-trimestre.component';


@NgModule({
  declarations: [
    DistritoComponent,
    ZonalComponent,
    HistoricoComponent,
    DistritoTrimestreComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule
  ]
})
export class ReporteModule { }
