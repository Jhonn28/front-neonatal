import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-tres-a',
  templateUrl: './tres-a.component.html',
  styleUrls: ['./tres-a.component.scss']
})
export class TresAComponent implements OnInit {

  supervisionForm: FormGroup = new FormGroup({});
  herramientasForm: FormGroup = new FormGroup({});

  datosIndicador;
  porcentaje_total: number = 0;

  visibleForm: boolean = false;
  numero_historias=0;

  //datos
  numerador: number = 0;
  denominador: number = 0;
  porcentaje: number = 0;
  suma: number = 0;


  //guarda encabezados
  seguimiento: any;

  //bloquear drop
  lectura_distrito = true;
  lectura_establecimiento = true;

  //dataOriginal
  originalData;

  //data
  distritos: any;
  establecimientos: any;
  datosSucursal;
  tiempo;
  indicadores;


  //ngModel
  selectDistrito = null;
  selectEstablecimiento = null;

  //cuando selecciona un registro
  selectRow = 0;


  constructor(
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _route: ActivatedRoute,
    private _indicadorService: IndicadorService
  ) {
    this.distritos = _route.snapshot.data['info'][0];
    this.establecimientos = _route.snapshot.data['info'][1];
    this.datosSucursal = _route.snapshot.data['info'][2];
    this.tiempo = _route.snapshot.data['info'][3];
    this.initForm();

  }

  async ngOnInit() {
    this.indicadores = await this._indicadorService.getIndicador({ide:'ide_indapar',campo:'detalle_indapar',tabla:'ind_atencion_parto'});
  }

  async initForm() {
    this.supervisionForm = this._formBuilder.group({
      distrito: [],
      establecimiento: [],
    })


    this.selectDistrito = this._utilService.getEmpresa();
    this.lectura_establecimiento = false;


  }

  async saveData(event) {


    if (this.compare(this.herramientasForm.value, this.originalData)) {
      this._utilService.toast_info('No se realizaron cambios.');
      return;
    }


    this.setData(this.insumosForm, this.codigoForm);
    const cabecera = new Object(
      {
        numerador_heg: this.numerador,
        denominador_heg: this.denominador,
        porcentaje_heg: this.porcentaje,
        ide_heg: this.selectRow
      }
    );

    const body = this.dataForm.value;
    let index = 0;
    this.datosIndicador.forEach(element => {

       delete body[index].ide_indapar;
       delete body[index].nro_historia_clinica_hpa;
       body[index]['ide_hpa']=+element.ide_hpa;
        index++;
    });


    const data = new Object({
      cabecera: cabecera,
      indicadores: body
    })





    await this._indicadorService.updateData(data, 'her_encabezado_general', 'ide_heg', 'her_atencion_parto','ide_hpa','ide_indapar').subscribe(async (res: any) => {
      //this.buscarSupervision();
      this.buscarSupervision();
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);

      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.selectRow=0;
      this.visibleForm=false;
    });

  }

  async buscarSupervision() {


    const distrito = this.supervisionForm.get('distrito').value;
    const establecimiento = this.supervisionForm.get('establecimiento').value;
    let query = '';
    if (establecimiento) {
      query = `establecimiento=${establecimiento}`;
    }
    await this._indicadorService.getEncabezadoGeneral(distrito, '3a', query).subscribe(resp => {
      this.seguimiento = resp;
      if (this.seguimiento.length == 0) {
        this._utilService.toast_info('No existen registros relacionados a los criterios de búsqueda.');
        return;
      }
      let suma_porcentaje: number = 0;
      this.seguimiento.forEach(element=>{
        suma_porcentaje+= Number(element.porcentaje);
      })
      this.porcentaje_total = Number((suma_porcentaje/this.seguimiento.length).toFixed(2));
    })

  }

  async resetInfo() {
    this.selectEstablecimiento = '';
    if(this.selectRow>0){
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);
      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.porcentaje_total=0;
      this.visibleForm=false;
    }
    this.seguimiento = [];
    this.originalData=[];
  }

  async onVisual(dataRow) {
    if(this.selectRow==dataRow.ide_heg) return;
    if(this.visibleForm){
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);
      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.visibleForm=false;
    }
    this.selectRow = dataRow.ide_heg;
    this.loadForm(this.selectRow, dataRow);

    //await this.loadForm(dataRow.ide_hlic, dataRow);

  }

  //funciones de comparacion
  compare(source, target): boolean {
    return JSON.stringify(source) === JSON.stringify(target);
  }

  //TODO: Funciones de carga

  loadForm(ide: number, data) {
    /* if(this.visibleForm){
      this.reset();
    }
    */
    this.numerador = data.numerador;
    this.denominador = data.denominador;
    this.porcentaje = data.porcentaje;

    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      distrito: [this.datosSucursal.distrito],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      mes_evaluado: [data.ide_indtp, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      insumos: this._formBuilder.array([]),
      codigo: this._formBuilder.array([]),
      data: this._formBuilder.array([])
    })



    this.loadData(ide);
  }

  //Carga indicadores

  async loadData(ide: number) {
    this.datosIndicador = await this._indicadorService.getDataIndicador('her_atencion_parto', this.selectRow, 'nro_historia_clinica_hpa asc, ide_indapar asc');
    //Carga indicadores
    const codigo = await this.filterCodigo(this.datosIndicador);
    this.numero_historias = codigo.length;

    codigo.forEach(element => {
      if (element.nro_historia_clinica_hpa) {
        this.codigoForm.push(this._formBuilder.group({
          codigo_clinica: [element.nro_historia_clinica_hpa]
        }))
      }
    });

    this.indicadores.forEach(element => {
      if (element.value != null) {
        this.insumosForm.push(this._formBuilder.group({
          ide: [element.value, Validators.required],
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
          nc1: [false, Validators.required],
          nc2: [false, Validators.required],
          nc3: [false, Validators.required],
          nc4: [false, Validators.required],
          nc5: [false, Validators.required],
          nc6: [false, Validators.required],
          nc7: [false, Validators.required],
          nc8: [false, Validators.required],
          nc9: [false, Validators.required],
          nc10: [false, Validators.required],
          nc11: [false, Validators.required],
          nc12: [false, Validators.required],
          nc13: [false, Validators.required],
          nc14: [false, Validators.required],
          nc15: [false, Validators.required],
          nc16: [false, Validators.required],
          nc17: [false, Validators.required],
          nc18: [false, Validators.required],
          nc19: [false, Validators.required],
          nc20: [false, Validators.required],
          nc21: [false, Validators.required],
          nc22: [false, Validators.required],
          nc23: [false, Validators.required],
          nc24: [false, Validators.required],
          nc25: [false, Validators.required],
          nc26: [false, Validators.required],
          nc27: [false, Validators.required],
          nc28: [false, Validators.required],
          nc29: [false, Validators.required],
          nc30: [false, Validators.required],
        }));
      }
    })

    const form = this.insumosForm.controls;
    let index_indicador = 0;
    let index_codigo = 1;


    this.datosIndicador.forEach(element => {

      form[index_indicador].get(String(index_codigo)).setValue(element.cumple_hpa)
      form[index_indicador].get(String('nc'+index_codigo)).setValue(element.no_aplica_hpa);

      index_indicador++;

      if (index_indicador == (this.indicadores.length)) {
        index_indicador = 0;
        index_codigo++;
      }
    });

    this.originalData =  this.herramientasForm.value;
    //form[0].get('1').setValue(true);

    this.visibleForm = true;

  }

  //promedio
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



  //set data
  setData(formulario, codigo) {
    let i = 0;

    codigo.value.forEach(element => {
      if (element.codigo_clinica.length > 0) {
        formulario.value.forEach(form => {
          this.dataForm.push(this._formBuilder.group({
            ide_indapar: [form.ide],
            nro_historia_clinica_hpa: [element.codigo_clinica],
            cumple_hpa: [form[i + 1]],
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




  //getters
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

  //obtiene codigos sin repetir;
  filterCodigo(array) {
    let hash = {};
    array = array.filter(function (current) {
      let exists = !hash[current.nro_historia_clinica_hpa];
      hash[current.nro_historia_clinica_hpa] = true;
      return exists;
    });
    return array;

  }

  getRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

}
