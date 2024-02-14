import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SystemService, UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-uno-a',
  templateUrl: './uno-a.component.html',
})
export class UnoAComponent implements OnInit {

  supervisionForm: FormGroup = new FormGroup({});
  herramientasForm: FormGroup = new FormGroup({});


  //VarStep
  insumos;
  consultorios;
  stock;
  laboratorio;
  servicio_emergencia;
  charoles;
  sala_recien;
  sala_parto;
  estacion_enfermeria;
  sala_cirugia;
  material_anestesia;

  numero_sala: any;
  items_cumple: number;
  total_items: number;
  promedio_general: number;

  visibleForm: boolean=false;

  porcentaje_total: number =0;


  //

  promedio_insumo: number;
  promedio_gineco: number;
  promedio_stock: number;
  promedio_laboratorio: number;
  promedio_servicio: number;
  promedio_charol: number;
  promedio_atencion_parto: number;
  promedio_atencion_nacido: number;
  promedio_estacion_enfermeria: number;
  promedio_sala_cirugia: number;
  promedio_material_anestesia: number;

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

  //ngModel
  selectDistrito = null;
  selectEstablecimiento = null;

  //cuando selecciona un registro
  selectRow = 0;


  constructor(
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _route: ActivatedRoute,
    private _indicadorService: IndicadorService,
    private _systemService: SystemService
  ) {
    this.distritos = _route.snapshot.data['info'][0];
    this.establecimientos = _route.snapshot.data['info'][1];
    this.datosSucursal = _route.snapshot.data['info'][2];
    this.tiempo = _route.snapshot.data['info'][3];
    this.initForm();

  }

  async ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.supervisionForm = this._formBuilder.group({
      distrito: [],
      establecimiento: [],
    })


    this.selectDistrito = this._utilService.getEmpresa();
    this.lectura_establecimiento = false;

    this.insumos = await this._indicadorService.getInsumos(1);
    this.consultorios = await this._indicadorService.getInsumos(2);
    this.stock = await this._indicadorService.getInsumos(3);
    this.laboratorio = await this._indicadorService.getInsumos(4);
    this.servicio_emergencia = await this._indicadorService.getInsumos(5);
    this.charoles = await this._indicadorService.getInsumos(6);
    this.sala_parto = await this._indicadorService.getInsumos(7);
    this.sala_recien = await this._indicadorService.getInsumos(8);
    this.estacion_enfermeria = await this._indicadorService.getInsumos(9);
    this.sala_cirugia = await this._indicadorService.getInsumos(10);
    this.material_anestesia = await this._indicadorService.getInsumos(11);
    

  }



  async buscarSupervision() {


    const distrito = this.supervisionForm.get('distrito').value;
    const establecimiento = this.supervisionForm.get('establecimiento').value;
    let query = '';
    if (establecimiento) {
      query = `establecimiento=${establecimiento}`;
    }
    await this._indicadorService.getIUnoA(distrito, query).subscribe(resp => {
      this.seguimiento = resp;
      if (this.seguimiento.length == 0) {
        this._utilService.toast_info('No existen registros relacionados a los criterios de búsqueda.')
      }
      let suma_porcentaje: number = 0;
      this.seguimiento.forEach(element=>{
        suma_porcentaje+= Number(element.porcentaje_estandar_hlic);
      })
      this.porcentaje_total = Number((suma_porcentaje/this.seguimiento.length).toFixed(2));
    })

  }

  async resetInfo() {
    this.selectEstablecimiento = '';
    this.seguimiento = [];
    this.reset();
  }

  async onVisual(dataRow) {
    this.numero_sala = await this._indicadorService.getNumeroSala(dataRow.ide_seges);
    await this._systemService.getInfoSucursal(dataRow.ide_seges).subscribe(res=>{
      this.datosSucursal = res;
    })
    this.selectRow = dataRow.ide_hlic;
    await this.loadForm(dataRow.ide_hlic, dataRow);
    this.promedio_insumo = Number(dataRow.promedio_preparacion_hlic);
    this.promedio_gineco = Number(dataRow.promedio_gineco_hlic);
    this.promedio_stock = Number(dataRow.promedio_farmacia_hlic);
    this.promedio_laboratorio = Number(dataRow.promedio_laboratorio_hlic);
    this.promedio_servicio = Number(dataRow.promedio_servicio_hlic);
    this.promedio_charol = Number(dataRow.promedio_charol_hlic);
    this.promedio_atencion_parto = Number(dataRow.promedio_atencion_parto_hlic);
    this.promedio_atencion_nacido = Number(dataRow.promedio_atencion_nacido_hlic);
    this.promedio_estacion_enfermeria = Number(dataRow.promedio_estacion_enfermeria_hlic);
    this.promedio_sala_cirugia = Number(dataRow.promedio_sala_cirugia_hlic);
    this.promedio_material_anestesia = Number(dataRow.promedio_material_anestesia_hlic);
    this.items_cumple = Number(dataRow.items_cumple_hlic);
    this.total_items = Number(dataRow.total_items_hlic);
    this.promedio_general = Number(dataRow.porcentaje_estandar_hlic);
  }

  //funciones de comparacion
  compare(source, target): boolean {
    return JSON.stringify(source) === JSON.stringify(target);
  }

  //TODO: Funciones de carga

  loadForm(ide: number, data) {
    if(this.visibleForm){
      this.reset();
    }
    this.herramientasForm = this._formBuilder.group({
      ide_seges: [this._utilService.getSucursal()],
      ide_segdis: [this._utilService.getEmpresa()],
      zona_hlic: [3],
      provincia_hlic: [this.datosSucursal.provincia],
      distrito_hlic: [this.datosSucursal.distrito],
      establecimiento_hlic: [this.datosSucursal.establecimiento],
      fecha_medicion_hlic: [this._utilService.getDateFormat(data.fecha_medicion_hlic,'yyyy/MM/dd')],
      ide_indtp: [data.ide_indtp, Validators.required],
      responsable_medicion_hlic: [this.datosSucursal.responsable_establecimiento],
      promedio_preparacion_hlic: [Number(data.promedio_preparacion_hlic)],
      promedio_gineco_hlic: [Number(data.promedio_gineco_hlic)],
      promedio_farmacia_hlic: [Number(data.promedio_farmacia_hlic)],
      promedio_laboratorio_hlic: [Number(data.promedio_laboratorio_hlic)],
      promedio_servicio_hlic: [Number(data.promedio_servicio_hlic)],
      promedio_charol_hlic: [Number(data.promedio_charol_hlic)],
      promedio_atencion_parto_hlic: [Number(data.promedio_atencion_parto_hlic)],
      promedio_atencion_nacido_hlic: [Number(data.promedio_atencion_nacido_hlic)],
      items_cumple_hlic: [Number(data.items_cumple_hlic)],
      total_items_hlic: [Number(data.total_items_hlic)],
      porcentaje_estandar_hlic: [Number(data.porcentaje_estandar_hlic)],

      insumos: this._formBuilder.array([]),
      consultorio: this._formBuilder.array([]),
      farmacia: this._formBuilder.array([]),
      laboratorio: this._formBuilder.array([]),
      servicio: this._formBuilder.array([]),
      charol_emergencia: this._formBuilder.array([]),
      atencion_parto: this._formBuilder.array([]),
      atencion_nacido: this._formBuilder.array([]),
      estacion_enfermeria: this._formBuilder.array([]),
      sala_cirugia: this._formBuilder.array([]),
      material_anestesia: this._formBuilder.array([]),

    });

    this.items_cumple = data.items_cumple_hlic;
    this.total_items = data.total_items_hlic;
    this.porcentaje_total = data.porcentaje_estandar_hlic;


    this.loadData(ide);
  }

  //Carga indicadores

  async loadData(ide: number) {
    //Carga indicadores

    let data = await this._indicadorService.getDataUnoA(ide, 1);
    data.forEach(element => {
      this.insumosForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })


    data = await this._indicadorService.getDataUnoA(ide, 2);
    data.forEach(element => {
      this.consultorioForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 3);
    data.forEach(element => {
      this.farmaciaForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 4);
    data.forEach(element => {
      this.laboratorioForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 5);
    data.forEach(element => {
      this.servicioForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 6);
    data.forEach(element => {
      this.charolEmergenciaForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })


    data = await this._indicadorService.getDataUnoA(ide, 7);
    data.forEach(element => {
      this.atencionPartoForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 8);
    data.forEach(element => {
      this.atencionNacidoForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 9);
    data.forEach(element => {
      this.estacionEnfermeriaForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 10);
    data.forEach(element => {
      this.salaCirugiaForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    data = await this._indicadorService.getDataUnoA(ide, 11);
    data.forEach(element => {
      this.materialAnestesiaForm.push(this._formBuilder.group({
        ide_hilic:[element.ide_hilic],
        ide_indins: [element.ide_indins, Validators.required],
        uno_hlic: [element.uno_hlic, Validators.required],
        dos_hlic: [element.dos_hlic, Validators.required],
        tres_hlic: [element.tres_hlic, Validators.required],
      }));
    })

    this.visibleForm=true;
    this.originalData = this.herramientasForm.value;

  }

  //Calcula promedio

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



  //getters

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
  get estacionEnfermeriaForm(): FormArray {
    return this.herramientasForm.get('estacion_enfermeria') as FormArray;
  }
  get salaCirugiaForm(): FormArray {
    return this.herramientasForm.get('sala_cirugia') as FormArray;
  }
  get materialAnestesiaForm(): FormArray {
    return this.herramientasForm.get('material_anestesia') as FormArray;
  }

  deleteForm(formulario) {
    while (formulario.length !== 0) {
      formulario.removeAt(0)
    }
  }


  reset(){
    this.herramientasForm.reset();
    this.deleteForm(this.insumosForm);
    this.deleteForm(this.consultorioForm);
    this.deleteForm(this.farmaciaForm);
    this.deleteForm(this.laboratorioForm);
    this.deleteForm(this.servicioForm);
    this.deleteForm(this.charolEmergenciaForm);
    this.deleteForm(this.atencionNacidoForm);
    this.deleteForm(this.atencionPartoForm);
    this.deleteForm(this.estacionEnfermeriaForm);
    this.deleteForm(this.salaCirugiaForm);
    this.deleteForm(this.materialAnestesiaForm);


    this.promedio_insumo = 0;
    this.promedio_gineco = 0;
    this.promedio_stock = 0;
    this.promedio_laboratorio = 0;
    this.promedio_servicio = 0;
    this.promedio_charol = 0;
    this.promedio_atencion_parto = 0;
    this.promedio_atencion_nacido = 0;
    this.promedio_estacion_enfermeria = 0;
    this.promedio_sala_cirugia = 0;
    this.promedio_material_anestesia = 0;

    this.visibleForm=false;
  }




}
