import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-diez',
  templateUrl: './diez.component.html',
  styleUrls: ['./diez.component.scss']
})
export class DiezComponent implements OnInit {

  supervisionForm: FormGroup = new FormGroup({});
  herramientasForm: FormGroup = new FormGroup({});

  datosIndicador;


  visibleForm: boolean = false;


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

    const t_muertes = this.herramientasForm.value.total_muertes;
    const t_complicacion = this.herramientasForm.value.total_complicaciones;
    const porcentaje= this.herramientasForm.value.porcentaje;

    if ((t_muertes==this.originalData.total_muertes)&&(t_complicacion==this.originalData.total_complicaciones)&&(porcentaje==this.originalData.porcentaje)) {
      this._utilService.toast_info('No se realizaron cambios.');
      return;
    }

    const cabecera = new Object(
      {
        numerador_heg:0,
        ide_heg: this.selectRow
      }
    );

    this.dataForm.push(this._formBuilder.group({
      ide_htl:[this.datosIndicador[0].ide_htl],
      total_muertes_htl: [t_muertes],
      total_complicaciones_htl: [t_complicacion],
      porcentaje_htl: [porcentaje],
    }))



    const data = new Object({
      cabecera: cabecera,
      indicadores: this.dataForm.value
    })



    await this._indicadorService.updateData(data, 'her_encabezado_general', 'ide_heg', 'her_tasa_letalidad', 'ide_htl', 'indpospar').subscribe(async (res: any) => {
      //this.buscarSupervision();
      this.buscarSupervision();
      this.deleteForm(this.dataForm);

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
    await this._indicadorService.getEncabezadoGeneral(distrito, '10', query).subscribe(resp => {
      this.seguimiento = resp;
      if (this.seguimiento.length == 0) {
        this._utilService.toast_info('No existen registros relacionados a los critérios de búsqueda.')
      }
    })

  }

  async resetInfo() {
    this.selectEstablecimiento = '';
    if (this.selectRow > 0) {
      this.deleteForm(this.dataForm);

      this.visibleForm = false;
    }
    this.selectRow=0;
    this.seguimiento = [];
    this.originalData = [];
  }

  async onVisual(dataRow) {
    console.log(dataRow);
    if (this.selectRow == dataRow.ide_heg) return;
    if (this.visibleForm) {
      this.deleteForm(this.dataForm);
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

    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      area_salud: [data.ide_thas,Validators.required],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      mes_evaluado: [data.ide_indtp, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      total_muertes: [0,Validators.required],
      total_complicaciones: [0,Validators.required],
      porcentaje: [0,Validators.required],
      data: this._formBuilder.array([])

    })

    this.loadData();
  }

  //Carga indicadores

  async loadData() {
    this.datosIndicador = await this._indicadorService.getDataIndicador('her_tasa_letalidad', this.selectRow, 'ide_htl asc');


    this.herramientasForm.get('total_muertes').setValue(this.datosIndicador[0].total_muertes_htl);
    this.herramientasForm.get('total_complicaciones').setValue(this.datosIndicador[0].total_complicaciones_htl);
    this.herramientasForm.get('porcentaje').setValue(this.datosIndicador[0].porcentaje_htl);

    this.originalData = this.herramientasForm.value;

    this.visibleForm = true;

  }


  promedio(formulario: FormGroup) {
    let muertes= formulario.value.total_muertes;
    let complicaciones=formulario.value.total_complicaciones;
    let porcentaje=0;

    if(complicaciones!=0){
      porcentaje = Number(((muertes*100)/complicaciones).toFixed(2));
    }

    formulario.get('porcentaje').setValue(porcentaje);
  }

  setData( formulario: FormGroup){

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
