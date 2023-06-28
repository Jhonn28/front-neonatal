import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { TalentoHumanoService } from 'app/services/talento-humano.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-uno-a',
  templateUrl: './uno-a.component.html',
  styleUrls: ['./uno-a.component.scss']
})
export class UnoAComponent implements OnInit {

  load2 = false;
  load3 = false;
  load4 = false;
  load5 = false;
  load6 = false;
  load7 = false;
  load8 = false;


  datosSucursal;
  tiempo;



  insumos;
  consultorios;
  stock;
  laboratorio;
  servicio_emergencia;
  charoles;
  sala_recien;
  sala_parto;

  numero_sala: any;
  items_cumple: number=0;
  total_items: number=0;
  promedio_general: number=0;



  //

  promedio_insumo: number=0;
  promedio_gineco: number=0;
  promedio_stock: number=0;
  promedio_laboratorio: number=0;
  promedio_servicio: number=0;
  promedio_charol: number=0;
  promedio_atencion_parto: number=0;
  promedio_atencion_nacido: number=0;
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
    this.numero_sala = _route.snapshot.data['info'][1];
    this.tiempo = _route.snapshot.data['info'][2];

    console.log('sucursal=>', this.datosSucursal);
    this.initForm();

  }

  async ngOnInit(): Promise<void> {

    this._utilService.showSpinner();
    this.insumos = await this._indicadorService.getInsumos(1);
    await this.loadDataStep1();

    this._utilService.hideSpinner();

  }


  initForm(): void {
    this.herramientasForm = this._formBuilder.group({
      ide_seges: [this._utilService.getSucursal()],
      ide_segdis: [this._utilService.getEmpresa()],
      zona_hlic: [3],
      provincia_hlic: [this.datosSucursal.provincia],
      distrito_hlic: [this.datosSucursal.distrito],
      establecimiento_hlic: [this.datosSucursal.establecimiento],
      fecha_medicion_hlic: [this._utilService.getDateCurrent()],
      ide_indtp: [,Validators.required],
      responsable_medicion_hlic: [this.datosSucursal.responsable_establecimiento],
      promedio_preparacion_hlic: [],
      promedio_gineco_hlic: [],
      promedio_farmacia_hlic: [],
      promedio_laboratorio_hlic: [],
      promedio_servicio_hlic: [],
      promedio_charol_hlic: [],
      promedio_atencion_parto_hlic: [],
      promedio_atencion_nacido_hlic: [],
      items_cumple_hlic: [],
      total_items_hlic: [],
      porcentaje_estandar_hlic: [],

      insumos: this._formBuilder.array([]),
      consultorio: this._formBuilder.array([]),
      farmacia: this._formBuilder.array([]),
      laboratorio: this._formBuilder.array([]),
      servicio: this._formBuilder.array([]),
      charol_emergencia: this._formBuilder.array([]),
      atencion_parto: this._formBuilder.array([]),
      atencion_nacido: this._formBuilder.array([])

    })

  }


  //TODO: Getters
  get insumosForm(): FormArray {
    return this.herramientasForm.get('insumos') as FormArray;
  }
  get consultorioForm(): FormArray {
    return this.herramientasForm.get('consultorio') as FormArray;
  }
  get farmaciaForm(): FormArray {
    return this.herramientasForm.get('farmacia') as FormArray;
  }
  get laboratorioForm(): FormArray {
    return this.herramientasForm.get('laboratorio') as FormArray;
  }
  get servicioForm(): FormArray {
    return this.herramientasForm.get('servicio') as FormArray;
  }
  get charolEmergenciaForm(): FormArray {
    return this.herramientasForm.get('charol_emergencia') as FormArray;
  }
  get atencionNacidoForm(): FormArray {
    return this.herramientasForm.get('atencion_nacido') as FormArray;
  }
  get atencionPartoForm(): FormArray {
    return this.herramientasForm.get('atencion_parto') as FormArray;
  }


  async saveData(event: any) {

console.log(this.herramientasForm.value);
    await this._indicadorService.saveSupervision(this.herramientasForm.value).subscribe(async (res: any) => {
    if(res){
      event.reset();
    this.deleteForm(this.insumosForm);
    this.deleteForm(this.consultorioForm);
    this.deleteForm(this.farmaciaForm);
    this.deleteForm(this.laboratorioForm);
    this.deleteForm(this.servicioForm);
    this.deleteForm(this.charolEmergenciaForm);
    this.deleteForm(this.atencionNacidoForm);
    this.deleteForm(this.atencionPartoForm);

    this.loadDataStep1();
    this.load2 = false;
    this.load3 = false;
    this.load4 = false;
    this.load5 = false;
    this.load6 = false;
    this.load7 = false;
    this.load8 = false;
    this.promedio_insumo = 0;
    this.promedio_gineco = 0;
    this.promedio_stock = 0;
    this.promedio_laboratorio = 0;
    this.promedio_servicio = 0;
    this.promedio_charol = 0;
    this.promedio_atencion_parto = 0;
    this.promedio_atencion_nacido = 0;
    }
    });


  }

  //TODO: Funciones de carga

  async loadDataStep1() {
    this.insumos.forEach(element => {
      if (element.value != null) {
        this.insumosForm.push(this._formBuilder.group({
          ide_indare: [1, Validators.required],
          ide_indins: [element.value, Validators.required],
          uno_hlic: [false, Validators.required],
          dos_hlic: [false, Validators.required],
          tres_hlic: [false, Validators.required],
        }));
      }
    })
  }

  async loadDataStep2() {
    if (!this.load2) {
      this.consultorios = await this._indicadorService.getInsumos(2);
      this.consultorios.forEach(element => {
        if (element.value != null) {
          this.consultorioForm.push(this._formBuilder.group({
            ide_indare: [2, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load2 = true;
    }
  }

  async loadDataStep3() {
    if (!this.load3) {
      this.stock = await this._indicadorService.getInsumos(3);
      this.stock.forEach(element => {
        if (element.value != null) {
          this.farmaciaForm.push(this._formBuilder.group({
            ide_indare: [3, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load3 = true;
    }
  }

  async loadDataStep4() {
    if (!this.load4) {
      this.laboratorio = await this._indicadorService.getInsumos(4);
      this.laboratorio.forEach(element => {
        if (element.value != null) {
          this.laboratorioForm.push(this._formBuilder.group({
            ide_indare: [4, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load4 = true;
    }
  }

  async loadDataStep5() {
    if (!this.load5) {
      this.servicio_emergencia = await this._indicadorService.getInsumos(5);
      this.servicio_emergencia.forEach(element => {
        if (element.value != null) {
          this.servicioForm.push(this._formBuilder.group({
            ide_indare: [5, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load5 = true;
    }
  }

  async loadDataStep6() {
    if (!this.load6) {
      this.charoles = await this._indicadorService.getInsumos(6);
      this.charoles.forEach(element => {
        if (element.value != null) {
          this.charolEmergenciaForm.push(this._formBuilder.group({
            ide_indare: [6, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load6 = true;
    }
  }

  async loadDataStep8() {
    if (!this.load8) {
      this.sala_recien = await this._indicadorService.getInsumos(8);
      this.sala_recien.forEach(element => {
        if (element.value != null) {
          this.atencionNacidoForm.push(this._formBuilder.group({
            ide_indare: [8, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load8 = true;
    }
  }

  async loadDataStep7() {
    if (!this.load7) {
      this.sala_parto = await this._indicadorService.getInsumos(7);
      this.sala_parto.forEach(element => {
        if (element.value != null) {
          this.atencionPartoForm.push(this._formBuilder.group({
            ide_indare: [7, Validators.required],
            ide_indins: [element.value, Validators.required],
            uno_hlic: [false, Validators.required],
            dos_hlic: [false, Validators.required],
            tres_hlic: [false, Validators.required],
          }));
        }
      })
      this.load7 = true;
    }
  }




  promedioInsumo(formulario, indicador, sala) {
    let suma = 0;
    const data = formulario.value;
    const total = data.length * sala;
    data.forEach(element => {
      (element.uno_hlic) ? suma++ : 0;
      (element.dos_hlic) ? suma++ : 0;
      (element.tres_hlic) ? suma++ : 0;
    });
    (indicador == 1) ? this.promedio_insumo = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 2) ? this.promedio_gineco = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 3) ? this.promedio_stock = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 4) ? this.promedio_laboratorio = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 5) ? this.promedio_servicio = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 6) ? this.promedio_charol = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 7) ? this.promedio_atencion_parto = Number(((suma * data.length) / total).toFixed(2)) : 0;
    (indicador == 8) ? this.promedio_atencion_nacido = Number(((suma * data.length) / total).toFixed(2)) : 0;
  }

  calculaTotal() {


    this.items_cumple = this.promedio_insumo + this.promedio_gineco + this.promedio_stock + this.promedio_laboratorio + this.promedio_servicio + this.promedio_charol + this.promedio_atencion_parto + this.promedio_atencion_nacido;

    this.total_items = this.insumosForm.length + this.consultorioForm.length + this.farmaciaForm.length + this.laboratorioForm.length + this.servicioForm.length + this.charolEmergenciaForm.length + this.atencionNacidoForm.length + this.atencionPartoForm.length;

    this.promedio_general = Number(((this.items_cumple * 100) / this.total_items).toFixed(2));

    this.herramientasForm.get('promedio_preparacion_hlic').setValue(this.promedio_insumo);
    this.herramientasForm.get('promedio_gineco_hlic').setValue(this.promedio_gineco);
    this.herramientasForm.get('promedio_farmacia_hlic').setValue(this.promedio_stock);
    this.herramientasForm.get('promedio_laboratorio_hlic').setValue(this.promedio_laboratorio);
    this.herramientasForm.get('promedio_servicio_hlic').setValue(this.promedio_servicio);
    this.herramientasForm.get('promedio_charol_hlic').setValue(this.promedio_charol);
    this.herramientasForm.get('promedio_atencion_parto_hlic').setValue(this.promedio_atencion_parto);
    this.herramientasForm.get('promedio_atencion_nacido_hlic').setValue(this.promedio_atencion_nacido);
    this.herramientasForm.get('items_cumple_hlic').setValue(this.items_cumple);
    this.herramientasForm.get('total_items_hlic').setValue(this.total_items);
    this.herramientasForm.get('porcentaje_estandar_hlic').setValue(this.promedio_general);

  }

  deleteForm(formulario) {
    while (formulario.length !== 0) {
      formulario.removeAt(0)
    }
  }


  reset(event: any){
    event.reset();
    this.deleteForm(this.insumosForm);
    this.deleteForm(this.consultorioForm);
    this.deleteForm(this.farmaciaForm);
    this.deleteForm(this.laboratorioForm);
    this.deleteForm(this.servicioForm);
    this.deleteForm(this.charolEmergenciaForm);
    this.deleteForm(this.atencionNacidoForm);
    this.deleteForm(this.atencionPartoForm);

    this.loadDataStep1();
    this.load2 = false;
    this.load3 = false;
    this.load4 = false;
    this.load5 = false;
    this.load6 = false;
    this.load7 = false;
    this.load8 = false;
    this.promedio_insumo = 0;
    this.promedio_gineco = 0;
    this.promedio_stock = 0;
    this.promedio_laboratorio = 0;
    this.promedio_servicio = 0;
    this.promedio_charol = 0;
    this.promedio_atencion_parto = 0;
    this.promedio_atencion_nacido = 0;

  }



}
