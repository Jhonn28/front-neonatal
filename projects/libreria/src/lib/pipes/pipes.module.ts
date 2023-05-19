import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterDropdownPipe } from './converter-dropdown.pipe';
import { ImagenPipe } from './imagen.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [
    ConverterDropdownPipe,
    ImagenPipe,
    FiltroPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConverterDropdownPipe,
    ImagenPipe,
    FiltroPipe
  ],
})
export class PipesModule { }
