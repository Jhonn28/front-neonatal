import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './cuenta.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
    {path:'', component:CuentaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
