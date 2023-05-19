import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-nueve-c',
  templateUrl: './nueve-c.component.html',
  styleUrls: ['./nueve-c.component.scss']
})
export class NueveCComponent implements OnInit {
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

    this._utilService.showSpinner();
    this.indicadores = await this._indicadorService.getIndicador({ide:'ide_indcnc',campo:'detalle_indcnc',tabla:'ind_complicacion_neonatal_c'});
    await this.loadDataStep1();
    this._utilService.hideSpinner();

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
      insumos: this._formBuilder.array([]),
      codigo: this._formBuilder.array([]),
      data: this._formBuilder.array([])
    })



    //console.log('codigo_form=>', this.codigoForm.controls);


  }




//guarda data
  async saveData(event: any) {

    let reg=0;

    console.log('formulario=>',this.herramientasForm);
    //return;
    if (this.herramientasForm.invalid) {
      this._utilService.toast_warning('Existen campos inválidos.');
      return;
    }

    this.codigoForm.value.forEach(element => {
      if(element.codigo_clinica.length>0){
        reg++;
      }
    });
    if(reg==0){
      this._utilService.toast_warning('Ingrese por lo menos un número de historia clínica.')
      return;
    }


    this.setData(this.insumosForm, this.codigoForm);
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
        numerador_heg: this.numerador,
        denominador_heg: this.denominador,
        porcentaje_heg: this.porcentaje,
        nro_herramienta_heg: '9c'
      }
    );

    const data = new Object({
      cabecera: cabecera,
      indicadores: this.dataForm.value
    })

    console.log(data);

    await this._indicadorService.saveData(data, 'her_encabezado_general', 'ide_heg', 'her_complicacion_neonatal_c').subscribe(async (res: any) => {
      if(res){
        this.deleteForm(this.insumosForm);
        this.deleteForm(this.codigoForm);
        this.deleteForm(this.dataForm);

        this.numerador = 0;
        this.denominador = 0;
        this.porcentaje = 0;

        this.loadDataStep1();
       }

    });


  }

  //TODO: Funciones de carga

  async loadDataStep1() {

    for (let i = 0; i < 30; i++) {
      this.codigoForm.push(this._formBuilder.group({
        codigo_clinica: ['', Validators.pattern("^[0-9]*$")]
      }))
    }

    this.indicadores.forEach(element => {
      if (element.value != null) {
        this.insumosForm.push(this._formBuilder.group({
          ide: [element.value, Validators.required],
          text:[element.label],
          1: [false, Validators.required],
          2: [false, Validators.required],
          3: [false, Validators.required],
          4: [false, Validators.required],
          5: [false, Validators.required],
          6: [false, Validators.required],
          7: [false, Validators.required],
          8: [false, Validators.required],
          9: [false, Validators.required],
          10: [false, Validators.required],
          11: [false, Validators.required],
          12: [false, Validators.required],
          13: [false, Validators.required],
          14: [false, Validators.required],
          15: [false, Validators.required],
          16: [false, Validators.required],
          17: [false, Validators.required],
          18: [false, Validators.required],
          19: [false, Validators.required],
          20: [false, Validators.required],
          21: [false, Validators.required],
          22: [false, Validators.required],
          23: [false, Validators.required],
          24: [false, Validators.required],
          25: [false, Validators.required],
          26: [false, Validators.required],
          27: [false, Validators.required],
          28: [false, Validators.required],
          29: [false, Validators.required],
          30: [false, Validators.required],
        }));
      }
    })
  }


  promedio(formulario, codigo) {
    let i = 0;
    this.suma = 0;
    let cumple = 0;
    this.numerador = 0;
    this.denominador = 0;
    let valido = false;
    codigo.value.forEach(element => {
      if (element.codigo_clinica.length > 0) {
        valido = true;
        this.denominador++;
        cumple = 0;
        formulario.value.forEach(element => {
          if (element[i + 1] == true) {
            cumple++;
            this.suma++;
          }
        });
        (cumple == this.indicadores.length) ? this.numerador += 1 : 0;
        i++;
      }
    });
    if (valido) {
      this.porcentaje = Number(((this.numerador * 100) / this.denominador).toFixed(2));
    }

  }

  setData(formulario, codigo) {
    let i = 0;

    codigo.value.forEach(element => {
      if (element.codigo_clinica.length > 0) {
        formulario.value.forEach(form => {
          this.dataForm.push(this._formBuilder.group({
            ide_indcnc: [form.ide],
            nro_historia_clinica_hcnc: [element.codigo_clinica],
            cumple_hcnc: [form[i + 1]],
          }))
        });
        i++;
      }
    });


  }


  deleteForm(formulario) {
    while (formulario.length !== 0) {
      formulario.removeAt(0)
    }
  }


  reset(event: any) {
    event.reset();
    this.deleteForm(this.insumosForm);

    this.loadDataStep1();

  }

  get insumosForm(): FormArray {
    return this.herramientasForm.get('insumos') as FormArray;
  }

  get codigoForm(): FormArray {
    return this.herramientasForm.get('codigo') as FormArray;
  }

  get dataForm(): FormArray {
    return this.herramientasForm.get('data') as FormArray;
  }

  get controlsCodigoForm() {
    return this.codigoForm.controls
  }

}