import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistritoComponent } from './distrito/distrito.component';
import { ZonalComponent } from './zonal/zonal.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  {path:'distrito',component: DistritoComponent},
  {path:'zonal',component: ZonalComponent},
  {path:'historico',component: HistoricoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
