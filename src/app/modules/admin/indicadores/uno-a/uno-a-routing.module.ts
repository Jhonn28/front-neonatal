import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnoAComponent } from './uno-a.component';

const routes: Routes = [
  {path:'',component:UnoAComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnoARoutingModule { }
