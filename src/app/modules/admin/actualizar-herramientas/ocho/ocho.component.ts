import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-ocho',
  templateUrl: './ocho.component.html',
  styleUrls: ['./ocho.component.scss']
})
export class OchoComponent implements OnInit {

  supervisionForm: FormGroup = new FormGroup({});
  herramientasForm: FormGroup = new FormGroup({});

  promedios;

  datosIndicador;


  visibleForm: boolean = false;

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
  area_salud;


  //ngModel
  selectDistrito = null;
  selectEstablecimiento = null;

  //cuando selecciona un registro
  selectRow = 0;


  //datos
  hemorragia_hco: number = 0;
  septico_hco: number = 0;
  ectopico_hco: number = 0;
  hidatiforme_hco: number = 0;
  placenta_hco: number = 0;
  desprendimiento_hco: number = 0;
  ruptura_hco: number = 0;
  retencion_hco: number = 0;
  atonia_hco: number = 0;
  inversion_hco: number = 0;
  desgarro_hco: number = 0;
  coagulo_hco: number = 0;
  parto_obstruido_hco: number = 0;
  sepsis_hco: number = 0;
  pre_eclampsia_hco: number = 0;
  amenaza_hco: number = 0;
  cesarea_hco: number = 0;


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

    if (this.compare(this.herramientasForm.value, this.originalData)) {
      this._utilService.toast_info('No se realizaron cambios.');
      return;
    }

    const cabecera = new Object(
      {
        numerador_heg: 0,
        ide_heg: this.selectRow
      }
    );


    const promedio = new Object({
      ide_hpco: this.promedios[0].ide_hpco,
      hemorragia_hpco: this.hemorragia_hco,
      septico_hpco: this.septico_hco,
      ectopico_hpco: this.ectopico_hco,
      hidatiforme_hpco: this.hidatiforme_hco,
      placenta_hpco: this.placenta_hco,
      desprendimiento_hpco: this.desprendimiento_hco,
      ruptura_hpco: this.ruptura_hco,
      retencion_hpco: this.retencion_hco,
      atonia_hpco: this.atonia_hco,
      inversion_hpco: this.inversion_hco,
      desgarro_hpco: this.desgarro_hco,
      coagulo_hpco: this.coagulo_hco,
      parto_obstruido_hpco: this.parto_obstruido_hco,
      sepsis_hpco: this.sepsis_hco,
      pre_eclampsia_hpco: this.pre_eclampsia_hco,
      amenaza_hpco: this.amenaza_hco,
      cesarea_hpco: this.cesarea_hco
    })
    const data = new Object({
      cabecera: cabecera,
      indicadores: this.insumosForm.value,
      promedio: promedio
    })

    await this._indicadorService.updateData(data, 'her_encabezado_general', 'ide_heg', 'her_complicacion_obstetrica', 'ide_hco', 'indpospar', 'tabla3=her_promedio_complicacion_obste', '&condition3=ide_hpco').subscribe(async (res: any) => {
      this.buscarSupervision();
      this.selectRow = 0;
      this.visibleForm = false;
      this.deleteForm(this.insumosForm);
      this.hemorragia_hco = 0;
      this.septico_hco = 0;
      this.ectopico_hco = 0;
      this.hidatiforme_hco = 0;
      this.placenta_hco = 0;
      this.desprendimiento_hco = 0;
      this.ruptura_hco = 0;
      this.retencion_hco = 0;
      this.atonia_hco = 0;
      this.inversion_hco = 0;
      this.desgarro_hco = 0;
      this.coagulo_hco = 0;
      this.parto_obstruido_hco = 0;
      this.sepsis_hco = 0;
      this.pre_eclampsia_hco = 0;
      this.amenaza_hco = 0;
      this.cesarea_hco = 0;
    });
  }

  async buscarSupervision() {


    const distrito = this.supervisionForm.get('distrito').value;
    const establecimiento = this.supervisionForm.get('establecimiento').value;
    let query = '';
    if (establecimiento) {
      query = `establecimiento=${establecimiento}`;
    }
    await this._indicadorService.getEncabezadoGeneral(distrito, '8', query).subscribe(resp => {
      this.seguimiento = resp;
      if (this.seguimiento.length == 0) {
        this._utilService.toast_info('No existen registros relacionados a los criterios de búsqueda.')
      }
    })

  }

  async resetInfo() {
    this.selectEstablecimiento = '';
    if (this.selectRow > 0) {
      this.visibleForm = false;
      this.deleteForm(this.insumosForm);
      this.hemorragia_hco = 0;
      this.septico_hco = 0;
      this.ectopico_hco = 0;
      this.hidatiforme_hco = 0;
      this.placenta_hco = 0;
      this.desprendimiento_hco = 0;
      this.ruptura_hco = 0;
      this.retencion_hco = 0;
      this.atonia_hco = 0;
      this.inversion_hco = 0;
      this.desgarro_hco = 0;
      this.coagulo_hco = 0;
      this.parto_obstruido_hco = 0;
      this.sepsis_hco = 0;
      this.pre_eclampsia_hco = 0;
      this.amenaza_hco = 0;
      this.cesarea_hco = 0;
      this.selectRow=0;
    }
    this.seguimiento = [];
    this.originalData = [];
  }

  async onVisual(dataRow) {

    if (this.selectRow == dataRow.ide_heg) return;
    if (this.visibleForm) {

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
      distrito: [this.datosSucursal.distrito],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      area_salud: [data.ide_thas],
      mes_evaluado: [data.ide_indtp, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      insumos: this._formBuilder.array([]),
    })



    this.loadData(ide);
  }

  //Carga indicadores

  async loadData(ide: number) {
    this.datosIndicador = await this._indicadorService.getDataIndicador('her_complicacion_obstetrica', this.selectRow, 'nro_historia_clinica_hco asc');
    this.promedios = await this._indicadorService.getDataIndicador('her_promedio_complicacion_obste', this.selectRow, 'ide_heg');


    if (this.datosIndicador.length == 0 || this.promedios.length == 0) {
      this._utilService.toast_info('No se encontraron registros');
      return;
    }

    //Carga indicadores

    this.datosIndicador.forEach(element => {
      this.insumosForm.push(this._formBuilder.group({
        ide_hco: [element.ide_hco],
        nro_historia_clinica_hco: [element.nro_historia_clinica_hco, [Validators.required, Validators.pattern("^[0-9]*$")]],
        hemorragia_hco: [element.hemorragia_hco, Validators.required],
        septico_hco: [element.septico_hco, Validators.required],
        ectopico_hco: [element.ectopico_hco, Validators.required],
        hidatiforme_hco: [element.hidatiforme_hco, Validators.required],
        placenta_hco: [element.placenta_hco, Validators.required],
        desprendimiento_hco: [element.desprendimiento_hco, Validators.required],
        ruptura_hco: [element.ruptura_hco, Validators.required],
        retencion_hco: [element.retencion_hco, Validators.required],
        atonia_hco: [element.tonia_hco, Validators.required],
        inversion_hco: [element.inversion_hco, Validators.required],
        desgarro_hco: [element.desgarro_hco, Validators.required],
        coagulo_hco: [element.coagulo_hco, Validators.required],
        parto_obstruido_hco: [element.parto_obstruido_hco, Validators.required],
        sepsis_hco: [element.sepsis_hco, Validators.required],
        pre_eclampsia_hco: [element.pre_eclampsia_hco, Validators.required],
        amenaza_hco: [element.amenaza_hco, Validators.required],
        cesarea_hco: [element.cesarea_hco, Validators.required],
      }));
    });

    this.hemorragia_hco = this.promedios[0].hemorragia_hpco;;
    this.septico_hco = this.promedios[0].septico_hpco;
    this.ectopico_hco = this.promedios[0].ectopico_hpco;
    this.hidatiforme_hco = this.promedios[0].hidatiforme_hpco;
    this.placenta_hco = this.promedios[0].placenta_hpco;
    this.desprendimiento_hco = this.promedios[0].desprendimiento_hpco;
    this.ruptura_hco = this.promedios[0].ruptura_hpco;
    this.retencion_hco = this.promedios[0].retencion_hpco;
    this.atonia_hco = this.promedios[0].atonia_hpco;
    this.inversion_hco = this.promedios[0].inversion_hpco;
    this.desgarro_hco = this.promedios[0].desgarro_hpco;
    this.coagulo_hco = this.promedios[0].coagulo_hpco;
    this.parto_obstruido_hco = this.promedios[0].parto_obstruido_hpco;
    this.sepsis_hco = this.promedios[0].sepsis_hpco;
    this.pre_eclampsia_hco = this.promedios[0].pre_eclampsia_hpco;
    this.amenaza_hco = this.promedios[0].amenaza_hpco;
    this.cesarea_hco = this.promedios[0].cesarea_hpco;


    this.originalData = this.herramientasForm.value;

    this.visibleForm = true;

  }

  //promedio
  promedio(formulario) {
    this.hemorragia_hco = 0;
    this.septico_hco = 0;
    this.ectopico_hco = 0;
    this.hidatiforme_hco = 0;
    this.placenta_hco = 0;
    this.desprendimiento_hco = 0;
    this.ruptura_hco = 0;
    this.retencion_hco = 0;
    this.atonia_hco = 0;
    this.inversion_hco = 0;
    this.desgarro_hco = 0;
    this.coagulo_hco = 0;
    this.parto_obstruido_hco = 0;
    this.sepsis_hco = 0;
    this.pre_eclampsia_hco = 0;
    this.amenaza_hco = 0;
    this.cesarea_hco = 0;

    formulario.value.forEach(element => {
      (element.hemorragia_hco) ? this.hemorragia_hco += 1 : 0;
      (element.septico_hco) ? this.septico_hco += 1 : 0;
      (element.ectopico_hco) ? this.ectopico_hco += 1 : 0;
      (element.hidatiforme_hco) ? this.hidatiforme_hco += 1 : 0;
      (element.placenta_hco) ? this.placenta_hco += 1 : 0;
      (element.desprendimiento_hco) ? this.desprendimiento_hco += 1 : 0;
      (element.ruptura_hco) ? this.ruptura_hco += 1 : 0;
      (element.retencion_hco) ? this.retencion_hco += 1 : 0;
      (element.atonia_hco) ? this.atonia_hco += 1 : 0;
      (element.inversion_hco) ? this.inversion_hco += 1 : 0;
      (element.desgarro_hco) ? this.desgarro_hco += 1 : 0;
      (element.coagulo_hco) ? this.coagulo_hco += 1 : 0;
      (element.parto_obstruido_hco) ? this.parto_obstruido_hco += 1 : 0;
      (element.sepsis_hco) ? this.sepsis_hco += 1 : 0;
      (element.pre_eclampsia_hco) ? this.pre_eclampsia_hco += 1 : 0;
      (element.amenaza_hco) ? this.amenaza_hco += 1 : 0;
      (element.cesarea_hco) ? this.cesarea_hco += 1 : 0;
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

}
