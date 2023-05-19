import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroHerramientasRoutingModule } from './registro-herramientas-routing.module';
import { UnoAComponent } from './uno-a/uno-a.component';


import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { MatRadioModule } from '@angular/material/radio';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonCoreModule } from '../../../../../projects/libreria/src/public-api';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DosComponent } from './dos/dos.component';
import { InputTextModule } from 'primeng/inputtext';
import { TresAComponent } from './tres-a/tres-a.component';
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
    RegistroHerramientasRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    TableModule,
    ButtonCoreModule,
    InputNumberModule,
    MatCheckboxModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    FormsModule,
    AccordionModule,
    InputSwitchModule,
    InputTextModule
  ]
})
export class RegistroHerramientasModule { }
