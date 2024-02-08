import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-cinco',
  templateUrl: './cinco.component.html',
  styleUrls: ['./cinco.component.scss']
})
export class CincoComponent implements OnInit {

  supervisionForm: FormGroup = new FormGroup({});
  herramientasForm: FormGroup = new FormGroup({});

  datosIndicador;


  visibleForm: boolean = false;
  numero_historias = 0;

  //datos
  numerador: number = 0;
  denominador: number = 0;
  porcentaje: number = 0;
  suma: number = 0;
  porcentaje_total: number = 0;


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
  area_salud;


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
    this.area_salud = _route.snapshot.data['info'][4];

    this.initForm();

  }

  async ngOnInit() {
    this.indicadores = await this._indicadorService.getIndicador({ide:'ide_indpospar',campo:'detalle_indpospar',tabla:'ind_atencion_post_parto'});
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

      delete body[index].indpospar;
      delete body[index].nro_historia_clinica_hapos;
      body[index]['ide_hapos'] = +element.ide_hapos;
      index++;
    });


    const data = new Object({
      cabecera: cabecera,
      indicadores: body
    })





    await this._indicadorService.updateData(data, 'her_encabezado_general', 'ide_heg', 'her_atencion_postparto', 'ide_hapos', 'indpospar').subscribe(async (res: any) => {
      //this.buscarSupervision();
      this.buscarSupervision();
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);

      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.selectRow = 0;
      this.visibleForm = false;
    });

  }

  async buscarSupervision() {


    const distrito = this.supervisionForm.get('distrito').value;
    const establecimiento = this.supervisionForm.get('establecimiento').value;
    let query = '';
    if (establecimiento) {
      query = `establecimiento=${establecimiento}`;
    }
    await this._indicadorService.getEncabezadoGeneral(distrito, '5', query).subscribe(resp => {
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
    });

  }

  async resetInfo() {
    this.selectEstablecimiento = '';
    if (this.selectRow > 0) {
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);
      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.porcentaje_total = 0;
      this.visibleForm = false;
    }
    this.seguimiento = [];
    this.originalData = [];
  }

  async onVisual(dataRow) {
    console.log(dataRow);
    if (this.selectRow == dataRow.ide_heg) return;
    if (this.visibleForm) {
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.codigoForm);
      this.deleteForm(this.dataForm);
      this.numerador = 0;
      this.denominador = 0;
      this.porcentaje = 0;
      this.visibleForm = false;
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

    this.numerador = data.numerador;
    this.denominador = data.denominador;
    this.porcentaje = data.porcentaje;

    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      distrito: [this.datosSucursal.distrito],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      area_salud: [data.ide_thas],
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
    this.datosIndicador = await this._indicadorService.getDataIndicador('her_atencion_postparto', this.selectRow, 'nro_historia_clinica_hapos asc, ide_indpospar asc');
    //Carga indicadores
    const codigo = await this.filterCodigo(this.datosIndicador);
    this.numero_historias = codigo.length;
    if (this.numero_historias == 0) {
      this._utilService.toast_info('No se encontraron registros');
      return;
    }

    codigo.forEach(element => {
      if (element.nro_historia_clinica_hapos) {
        this.codigoForm.push(this._formBuilder.group({
          codigo_clinica: [element.nro_historia_clinica_hapos]
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
        }));
      }
    })

    const form = this.insumosForm.controls;
    let index_indicador = 0;
    let index_codigo = 1;


    this.datosIndicador.forEach(element => {

      form[index_indicador].get(String(index_codigo)).setValue(element.cumple_hapos)

      index_indicador++;

      if (index_indicador == (this.indicadores.length)) {
        index_indicador = 0;
        index_codigo++;
      }
    });

    this.originalData = this.herramientasForm.value;
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
            ide_indpospar: [form.ide],
            nro_historia_clinica_hapos: [element.codigo_clinica],
            cumple_hapos: [form[i + 1]],
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
      let exists = !hash[current.nro_historia_clinica_hapos];
      hash[current.nro_historia_clinica_hapos] = true;
      return exists;
    });
    return array;
  }

}
