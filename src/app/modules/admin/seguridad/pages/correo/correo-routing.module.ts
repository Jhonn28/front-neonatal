import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreoComponent } from './correo.component';

const routes: Routes = [
  { path: '', component: CorreoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorreoRoutingModule { }
