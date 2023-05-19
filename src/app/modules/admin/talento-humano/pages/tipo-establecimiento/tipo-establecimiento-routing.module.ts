import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoEstablecimientoComponent } from './tipo-establecimiento.component';

const routes: Routes = [
  {path:'', component: TipoEstablecimientoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoEstablecimientoRoutingModule { }
