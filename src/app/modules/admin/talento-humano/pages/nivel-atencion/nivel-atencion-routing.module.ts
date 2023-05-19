import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelAtencionComponent } from './nivel-atencion.component';

const routes: Routes = [
  {path:'', component:NivelAtencionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelAtencionRoutingModule { }
