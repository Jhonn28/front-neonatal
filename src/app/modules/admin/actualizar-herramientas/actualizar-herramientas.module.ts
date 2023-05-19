import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualizarHerramientasRoutingModule } from './actualizar-herramientas-routing.module';
import { UnoAComponent } from './uno-a/uno-a.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonCoreModule } from '../../../../../projects/libreria/src/public-api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { MatStepperModule } from '@angular/material/stepper';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DosComponent } from './dos/dos.component';
import { InputTextModule } from 'primeng/inputtext';
import { TresAComponent } from './tres-a/tres-a.component';
import { MatButtonModule } from '@angular/material/button';
import { TresBComponent } from './tres-b/tres-b.component';
import { CuatroComponent } from './cuatro/cuatro.component';
import { CincoComponent } from './cinco/cinco.component';
import { SeisComponent } from './seis/seis.component';
import { SieteAComponent } from './siete-a/siete-a.component';
import { SieteBComponent } from './siete-b/siete-b.component';
import { OchoComponent } from './ocho/ocho.component';
import { OchoAComponent } from './ocho-a/ocho-a.component';
import { OchoBComponent } from './ocho-b/ocho-b.component';
import { OchoCComponent } from './ocho-c/ocho-c.component';
import { OchoDComponent } from './ocho-d/ocho-d.component';
import { OchoEComponent } from './ocho-e/ocho-e.component';
import { OchoFComponent } from './ocho-f/ocho-f.component';
import { NueveAComponent } from './nueve-a/nueve-a.component';
import { NueveBComponent } from './nueve-b/nueve-b.component';
import { NueveCComponent } from './nueve-c/nueve-c.component';
import { DiezComponent } from './diez/diez.component';
import { OnceComponent } from './once/once.component';
import { DoceComponent } from './doce/doce.component';
import { TreceComponent } from './trece/trece.component';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    UnoAComponent,
    DosComponent,
    TresAComponent,
    TresBComponent,
    CuatroComponent,
    CincoComponent,
    SeisComponent,
    SieteAComponent,
    SieteBComponent,
    OchoComponent,
    OchoAComponent,
    OchoBComponent,
    OchoCComponent,
    OchoDComponent,
    OchoEComponent,
    OchoFComponent,
    NueveAComponent,
    NueveBComponent,
    NueveCComponent,
    DiezComponent,
    OnceComponent,
    DoceComponent,
    TreceComponent
  ],
  imports: [
    CommonModule,
    ActualizarHerramientasRoutingModule,
    ReactiveFormsModule,
    InputSwitchModule,
    MatIconModule,
    MatFormFieldModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    ButtonCoreModule,
    DialogModule,
    DropdownModule,
    AccordionModule,
    MatStepperModule,
    InputTextModule,
    MatButtonModule,
    FormsModule,
    InputNumberModule
  ]
})
export class ActualizarHerramientasModule { }
