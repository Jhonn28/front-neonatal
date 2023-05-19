import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglasClaveComponent } from './reglas-clave.component';

const routes: Routes = [
  { path: '', component: ReglasClaveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglasClaveRoutingModule { }
