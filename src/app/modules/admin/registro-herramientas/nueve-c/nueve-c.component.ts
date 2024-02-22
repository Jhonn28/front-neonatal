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
      area_salud: [],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent('YYYY/MM/DD')],
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

    let cod_invalid='';

    this.codigoForm.value.forEach(element => {
      if(element.codigo_clinica.length>0){
        if(element.codigo_clinica.length!=10){
          cod_invalid+=element.codigo_clinica+' ';
        }
        reg++;
      }
    });
    if(reg==0){
      this._utilService.toast_warning('Ingrese por lo menos un número de historia clínica.')
      return;
    }

    if(cod_invalid.length!=0){
      this._utilService.toast_warning('El/los número/s de historia/s clínica/s: '+cod_invalid+'son incorrectos.')
    return;
    }

    const codigos = await this.filterCodigo(this.codigoForm.value);

    if(codigos.length-1!=reg){
      this._utilService.toast_warning('Existen números de historía clínica que se repiten.');
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
          1: [false],
          2: [false],
          3: [false],
          4: [false],
          5: [false],
          6: [false],
          7: [false],
          8: [false],
          9: [false],
          10: [false],
          11: [false],
          12: [false],
          13: [false],
          14: [false],
          15: [false],
          16: [false],
          17: [false],
          18: [false],
          19: [false],
          20: [false],
          21: [false],
          22: [false],
          23: [false],
          24: [false],
          25: [false],
          26: [false],
          27: [false],
          28: [false],
          29: [false],
          30: [false],
          nc1: [false],
          nc2: [false],
          nc3: [false],
          nc4: [false],
          nc5: [false],
          nc6: [false],
          nc7: [false],
          nc8: [false],
          nc9: [false],
          nc10: [false],
          nc11: [false],
          nc12: [false],
          nc13: [false],
          nc14: [false],
          nc15: [false],
          nc16: [false],
          nc17: [false],
          nc18: [false],
          nc19: [false],
          nc20: [false],
          nc21: [false],
          nc22: [false],
          nc23: [false],
          nc24: [false],
          nc25: [false],
          nc26: [false],
          nc27: [false],
          nc28: [false],
          nc29: [false],
          nc30: [false],
        }));
      }
    })
  }


  promedio(formulario, codigo) {
    let i = 0;
    let suma = 0;
    let cumple = 0;
    this.numerador = 0;
    this.denominador = 0;
    let valido = false;
    codigo.value.forEach(element => {
      if (element.codigo_clinica.length > 0) {
        valido = true;
        this.denominador++;
        cumple = 0;
        suma=0;
        formulario.value.forEach(element => {
          if (element[i + 1] == true) {
            cumple++;
          }
          if(element[i+1]!=null){
            suma++;
          }
        });
        (cumple == suma) ? this.numerador += 1 : 0;
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
            no_aplica_hcnc:[form['nc'+Number(i+1)]]
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

  filterCodigo(array) {
    let hash = {};
    array = array.filter(function (current) {
      let exists = !hash[current.codigo_clinica];
      hash[current.codigo_clinica] = true;
      return exists;
    });
    return array;
  }

  checkNoAply(event: any, index: number, form: FormArray, campo: string,indicador,codigo) {
    console.log(event);
    (event.checked) ? form[index].get(campo).setValue(null) : form[index].get(campo).setValue(false);
    this.promedio(indicador,codigo);
  }

  checkYes(event: any, index: number, form: FormArray, campo: string,indicador,codigo ){
    (event) ? form[index].get(campo).setValue(false) : 0;
    this.promedio(indicador,codigo);
  }


}
