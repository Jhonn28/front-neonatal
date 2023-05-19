import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadOperativaComponent } from './entidad-operativa.component';

const routes: Routes = [
  {path:'', component: EntidadOperativaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadOperativaRoutingModule { }
