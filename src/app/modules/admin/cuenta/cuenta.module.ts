import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CuentaComponent } from './cuenta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseNavigationModule } from '../../../../@fuse/components/navigation/navigation.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'primeng/fileupload';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '../../../../@fuse/components/alert/alert.module';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';



@NgModule({
  declarations: [
    PerfilComponent,
    CuentaComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    ReactiveFormsModule,
    //
    MatSidenavModule,
    FuseNavigationModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    FuseAlertModule,

    FormsModule,
    //
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class CuentaModule { }
