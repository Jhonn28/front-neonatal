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
  mes;

  disable_enero=false;
  disable_febrero=false;
  disable_marzo=false;
  disable_abril=false;
  disable_mayo=false;
  disable_junio=false;
  disable_julio=false;
  disable_agosto=false;
  disable_septiembre=false;
  disable_octubre=false;
  disable_noviembre=false;
  disable_diciembre=false;

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
    this.mes= Number(this._utilService.getDateCurrent('MM'));
    if(this.mes>1) this.disable_enero = true;
    if(this.mes>2) this.disable_febrero = true;
    if(this.mes>3) this.disable_marzo = true;
    if(this.mes>4) this.disable_abril = true;
    if(this.mes>5) this.disable_mayo = true;
    if(this.mes>6) this.disable_junio = true;
    if(this.mes>7) this.disable_julio = true;
    if(this.mes>8) this.disable_agosto = true;
    if(this.mes>9) this.disable_septiembre = true;
    if(this.mes>10) this.disable_octubre = true;
    if(this.mes>11) this.disable_noviembre = true;

  }


  //iniciamos Formulario
  async initForm() {

    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      area_salud: [],
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

    const data = await this._indicadorService.getPorcentajeComplicacion(this._utilService.getSucursal(),this._utilService.getDateCurrent('yyyy'));
    console.log(data);

    if(data.length>0){
      this.herramientasForm.get('enero').setValue(data[0].enero_hpc);
      this.herramientasForm.get('febrero').setValue(data[0].febrero_hpc);
      this.herramientasForm.get('marzo').setValue(data[0].marzo_hpc);
      this.herramientasForm.get('abril').setValue(data[0].abril_hpc);
      this.herramientasForm.get('mayo').setValue(data[0].mayo_hpc);
      this.herramientasForm.get('junio').setValue(data[0].junio_hpc);
      this.herramientasForm.get('julio').setValue(data[0].julio_hpc);
      this.herramientasForm.get('agosto').setValue(data[0].agosto_hpc);
      this.herramientasForm.get('septiembre').setValue(data[0].septiembre_hpc);
      this.herramientasForm.get('octubre').setValue(data[0].octubre_hpc);
      this.herramientasForm.get('noviembre').setValue(data[0].noviembre_hpc);
      this.herramientasForm.get('diciembre').setValue(data[0].diciembre_hpc);

      this.herramientasForm.get('embarazadas').setValue(data[0].numero_embarazada_hpc);

      this.herramientasForm.get('total_muertes').setValue(data[0].total_muertes_hpc);
      this.herramientasForm.get('total_atendidos').setValue(Number(data[0].total_complicaciones_hpc));
      this.herramientasForm.get('porcentaje').setValue(Number(data[0].porcentaje_hpc));
    }

  }

  //guarda data
  async saveData() {

    if (this.herramientasForm.value.total_muertes > this.herramientasForm.value.total_atendidos) {
      this._utilService.toast_warning('La suma de complicaciones obstétricas atendidas no puede ser mayor al total de complicaciones obstétricas esperadas.')
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
