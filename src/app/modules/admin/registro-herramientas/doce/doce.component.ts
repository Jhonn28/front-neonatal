import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-doce',
  templateUrl: './doce.component.html',
  styleUrls: ['./doce.component.scss']
})
export class DoceComponent implements OnInit {
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
      area_salud: [,Validators.required],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      mes_evaluado: [, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      total_muertes: [0, Validators.required],
      total_atendidos: [0, Validators.required],
      porcentaje: [0, Validators.required],
      enero: [0, Validators.required],
      febrero: [0, Validators.required],
      marzo: [0, Validators.required],
      abril: [0, Validators.required],
      mayo: [0, Validators.required],
      junio: [0, Validators.required],
      julio: [0, Validators.required],
      agosto: [0, Validators.required],
      septiembre: [0, Validators.required],
      octubre: [0, Validators.required],
      noviembre: [0, Validators.required],
      diciembre: [0, Validators.required],
      embarazadas: [0, Validators.required],
      data: this._formBuilder.array([])
    })
  }

  //guarda data
  async saveData() {

    if (this.herramientasForm.value.total_muertes > this.herramientasForm.value.total_atendidos) {
      this._utilService.toast_warning('El número de muertes no puede superar al número de atendidos.')
      return;
    }
    if (this.herramientasForm.invalid) {
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
        nro_herramienta_heg: '12'
      }
    );

    const data = new Object({
      cabecera: cabecera,
      indicadores: this.dataForm.value
    })

    console.log(data);

    await this._indicadorService.saveData(data, 'her_encabezado_general', 'ide_heg', 'her_porcentaje_complicaciones').subscribe(async (res: any) => {
      if(res){
      this.herramientasForm.get('enero').setValue(0);
      this.herramientasForm.get('febrero').setValue(0);
      this.herramientasForm.get('marzo').setValue(0);
      this.herramientasForm.get('abril').setValue(0);
      this.herramientasForm.get('mayo').setValue(0);
      this.herramientasForm.get('junio').setValue(0);
      this.herramientasForm.get('julio').setValue(0);
      this.herramientasForm.get('agosto').setValue(0);
      this.herramientasForm.get('septiembre').setValue(0);
      this.herramientasForm.get('octubre').setValue(0);
      this.herramientasForm.get('noviembre').setValue(0);
      this.herramientasForm.get('diciembre').setValue(0);
      this.herramientasForm.get('total_muertes').setValue(0);
      this.herramientasForm.get('total_atendidos').setValue(0);
      this.herramientasForm.get('embarazadas').setValue(0);
      this.herramientasForm.get('porcentje').setValue(0);
      this.deleteForm(this.dataForm);
      }
    });


  }




  promedio(formulario: FormGroup) {
    const enero = formulario.value.enero;
    const febrero = formulario.value.febrero;
    const marzo = formulario.value.marzo;
    const abril = formulario.value.abril;
    const mayo = formulario.value.mayo;
    const junio = formulario.value.junio;
    const julio = formulario.value.julio;
    const agosto = formulario.value.agosto;
    const septiembre = formulario.value.septiembre;
    const octubre = formulario.value.octubre;
    const noviembre = formulario.value.noviembre;
    const diciembre = formulario.value.diciembre;
    let total = (formulario.value.embarazadas*0.15);
    let porcentaje = 0;


    const casos =  enero+febrero+marzo+abril+mayo+junio+julio+agosto+septiembre+octubre+noviembre+diciembre;
    if (total != 0) {
      porcentaje = Number(((casos * 100) / total).toFixed(2));
    }

    formulario.get('total_muertes').setValue(casos);
    formulario.get('total_atendidos').setValue(total);
    formulario.get('porcentaje').setValue(porcentaje);
  }

  setData(formulario: FormGroup) {
    this.dataForm.push(this._formBuilder.group({
      total_muertes_hpc: [formulario.value.total_muertes],
      total_complicaciones_hpc: [formulario.value.total_atendidos],
      porcentaje_hpc: [formulario.value.porcentaje],
      enero_hpc: [formulario.value.enero],
      febrero_hpc: [formulario.value.febrero],
      marzo_hpc: [formulario.value.marzo],
      abril_hpc: [formulario.value.abril],
      mayo_hpc: [formulario.value.mayo],
      junio_hpc: [formulario.value.junio],
      julio_hpc: [formulario.value.julio],
      agosto_hpc: [formulario.value.agosto],
      septiembre_hpc: [formulario.value.septiembre],
      octubre_hpc: [formulario.value.octubre],
      noviembre_hpc: [formulario.value.noviembre],
      diciembre_hpc: [formulario.value.diciembre],
      numero_embarazada_hpc: [formulario.value.embarazadas]
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
