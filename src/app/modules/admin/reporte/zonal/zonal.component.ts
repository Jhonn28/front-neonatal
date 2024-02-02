import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { IndicadorService } from 'app/services/indicador.service';

interface Dato {
  provincia: string;
  distrito: string;
  promedio_1?: string;
  dos: string;
  tres_a:  string;
  tres_b:  string;
  cuatro:  string;
  cinco:  string;
  seis:  string;
  siete_a:  string;
  siete_b:  string;
  ocho_a:string;
  ocho_b:string;
  ocho_c: string;
  ocho_d: string;
  ocho_e: string;
  ocho_f: string;
  nueve_a: string;
  nueve_b: string;
  nueve_c: string;
  diez: string;
  once: string;
  doce: string;
  trece: string
}

@Component({
  selector: 'app-zonal',
  templateUrl: './zonal.component.html',
  styleUrls: ['./zonal.component.scss']
})

export class ZonalComponent implements OnInit {
  data;
  promedio:number=0;
  reporteForm: FormGroup = new FormGroup({});

  products = [
    { code: 1, name: 'ciudad 1', category: 'categoria', quantity: 'cuantidad' },
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _indicadorService: IndicadorService

  ) { }

  ngOnInit(): void {

    this.reporteForm = this._formBuilder.group({
      anio: [, Validators.required],
      distrito: [this._utilService.getEmpresa()],
    })
  }

  async buscar() {
    //console.log('entro a buscar');
    if (this.reporteForm.invalid) {
      this._utilService.addWarningMessage('Ingrese un año válido');
      return;
    }
    this.data = await this._indicadorService.getReporteZonal(this._utilService.getFormatDate(this.reporteForm.value.anio, 'yyyy'));
    if(this.data.length==0){
      this._utilService.addMessageInfo('No se encontraron registros en el año de búsqueda');
      return;
    }
    let suma: number=0; 
    let total:number;
    this.data.forEach(element => {
      suma = 0;
      total = Number(element.promedio_1)+Number(element.dos)+Number(element.tres_a)+Number(element.tres_b)+Number(element.cuatro)+Number(element.cinco)+Number(element.seis)+Number(element.siete_a)+Number(element.siete_b)+Number(element.ocho_a)+Number(element.ocho_b)+Number(element.tres_a)+Number(element.tres_a)+Number(element.tres_a)+Number(element.tres_a)+Number(element.tres_a)+Number(element.ocho_c)+Number(element.ocho_d)+Number(element.ocho_e)+Number(element.ocho_f)+Number(element.nueve_a)+Number(element.nueve_b)+Number(element.nueve_c)+Number(element.diez)+Number(element.once)+Number(element.doce)+Number(element.trece);
      const porcentaje_total = total/22;
      element['total']=Number(porcentaje_total.toFixed(2));
      suma+=porcentaje_total;
    });
    this.promedio=Number((suma/this.data.length).toFixed(2));
    console.log('data=>',this.data);
  }

  limpiar(){
    this.reporteForm.get('anio').setValue('');
    this.data = [];
  }


}
