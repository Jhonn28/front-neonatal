import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-trece',
  templateUrl: './trece.component.html',
  styleUrls: ['./trece.component.scss']
})
export class TreceComponent implements OnInit {
  datosSucursal;


  indicadores;
  tiempo;
  area_salud;

  numerador: number = 0;
  denominador: number = 0;
  porcentaje: number = 0;

  suma: number = 0;
  //


  //TODO: formulario
  herramientasForm: FormGroup = new FormGroup({});


  constructor(private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _indicadorService: IndicadorService
    //public datepipe: DatePipe
  ) {
    this.datosSucursal = _route.snapshot.data['info'][0];
    this.tiempo = _route.snapshot.data['info'][1];
    this.area_salud = _route.snapshot.data['info'][2];

    //console.log('sucursal=>', this.datosSucursal);
    this.initForm();

  }

  async ngOnInit(): Promise<void> {


  }


  //iniciamos Formulario
  initForm(): void {
    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      area_salud: [],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      mes_evaluado: [, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      total_muertes: [0,Validators.required],
      total_atendidos: [0,Validators.required],
      porcentaje: [0,Validators.required],
      data: this._formBuilder.array([])
    })
  }

//guarda data
  async saveData() {

    if(this.herramientasForm.value.total_muertes>this.herramientasForm.value.total_atendidos){
      this._utilService.toast_warning('El total de muertes maternas que tienen un proceso de investigación epidemiológica no puede ser mayor al total de muertes maternas.')
      return;
    }
    if(this.herramientasForm.invalid){
      this._utilService.toast_warning('Existen campos inválidos');
      return;
    }

    this.setData(this.herramientasForm);

    const cabecera = new Object(
      {
        ide_segdis: this._utilService.getEmpresa(),
        ide_seges: this._utilService.getSucursal(),
        ide_indtp: this.herramientasForm.get('mes_evaluado').value,
        provincia_heg: this.herramientasForm.get('provincia').value,
        ide_thas: this.herramientasForm.get('area_salud').value,
        unidad_operativa_heg: this.herramientasForm.get('unidad_operativa').value,
        fecha_medicion_heg: this.herramientasForm.get('fecha_medicion').value,
        responsable_medicion_heg: this.herramientasForm.get('responsable_medicion').value,
        numerador_heg: this.herramientasForm.get('total_muertes').value,
        denominador_heg: this.herramientasForm.get('total_atendidos').value,
        porcentaje_heg: this.herramientasForm.get('porcentaje').value,
        nro_herramienta_heg: '13'
      }
    );

    const data = new Object({
      cabecera: cabecera,
      indicadores: this.dataForm.value
    })

    console.log(data);

    await this._indicadorService.saveData(data, 'her_encabezado_general', 'ide_heg', 'her_porcentaje_muertes').subscribe(async (res: any) => {
      if(res){
      this.herramientasForm.get('total_muertes').setValue(0);
      this.herramientasForm.get('total_atendidos').setValue(0);
      this.herramientasForm.get('porcentaje').setValue(0);
      this.deleteForm(this.dataForm);
      }
    });


  }




  promedio(formulario: FormGroup) {
    let muertes= formulario.value.total_muertes;
    let complicaciones=formulario.value.total_atendidos;
    let porcentaje=0;

    if(complicaciones!=0){
      porcentaje = Number(((muertes*100)/complicaciones).toFixed(2));
    }

    formulario.get('porcentaje').setValue(porcentaje);
  }

  setData( formulario: FormGroup){
    this.dataForm.push(this._formBuilder.group({
      total_muertes_hpm: [formulario.value.total_muertes],
      total_complicaciones_hpm: [formulario.value.total_atendidos],
      porcentaje_hpm: [formulario.value.porcentaje],
    }))
  }

  get dataForm(): FormArray {
    return this.herramientasForm.get('data') as FormArray;
  }
  deleteForm(formulario) {
    while (formulario.length !== 0) {
      formulario.removeAt(0)
    }
  }

}
