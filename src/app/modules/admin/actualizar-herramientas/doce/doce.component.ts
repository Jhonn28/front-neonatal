import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-doce',
  templateUrl: './doce.component.html',
  styleUrls: ['./doce.component.scss']
})
export class DoceComponent implements OnInit {

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
    const t_atendidos= this.herramientasForm.value.total_atendidos;
    const porcentaje= this.herramientasForm.value.porcentaje;

    if ((t_muertes==this.originalData.total_muertes)&&(t_atendidos==this.originalData.total_atendidos)&&(porcentaje==this.originalData.porcentaje)) {
      this._utilService.toast_info('No se realizaron cambios.');
      return;
    }

    const cabecera = new Object(
      {
        numerador_heg:0,
        ide_heg: this.selectRow
      }
    );
      const formulario = this.herramientasForm.value;
    this.dataForm.push(this._formBuilder.group({
      ide_hpc:[this.datosIndicador[0].ide_hpc],
      total_muertes_hpc: [t_muertes],
      total_complicaciones_hpc: [t_atendidos],
      porcentaje_hpc: [porcentaje],
      enero_hpc: [formulario.enero],
      febrero_hpc: [formulario.febrero],
      marzo_hpc: [formulario.marzo],
      abril_hpc: [formulario.abril],
      mayo_hpc: [formulario.mayo],
      junio_hpc: [formulario.junio],
      julio_hpc: [formulario.julio],
      agosto_hpc: [formulario.agosto],
      septiembre_hpc: [formulario.septiembre],
      octubre_hpc: [formulario.octubre],
      noviembre_hpc: [formulario.noviembre],
      diciembre_hpc: [formulario.diciembre],
      numero_embarazada_hpc: [formulario.embarazadas]
    }))



    const data = new Object({
      cabecera: cabecera,
      indicadores: this.dataForm.value
    })



    await this._indicadorService.updateData(data, 'her_encabezado_general', 'ide_heg', 'her_porcentaje_complicaciones', 'ide_hpc', 'indpospar').subscribe(async (res: any) => {
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
    await this._indicadorService.getEncabezadoGeneral(distrito, '12', query).subscribe(resp => {
      this.seguimiento = resp;
      if (this.seguimiento.length == 0) {
        this._utilService.toast_info('No existen registros relacionados a los criterios de búsqueda.')
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
      total_atendidos: [0,Validators.required],
      porcentaje: [0,Validators.required],
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

    this.loadData();
  }

  //Carga indicadores

  async loadData() {
    this.datosIndicador = await this._indicadorService.getDataIndicador('her_porcentaje_complicaciones', this.selectRow, 'ide_hpc asc');
    if(this.datosIndicador.length==0){
      this._utilService.toast_info('No se encuentran registros relacionados.');
      return;
    }
    console.log(this.datosIndicador);
    this.herramientasForm.get('total_muertes').setValue(this.datosIndicador[0].total_muertes_hpc);
    this.herramientasForm.get('total_atendidos').setValue(this.datosIndicador[0].total_complicaciones_hpc);
    this.herramientasForm.get('porcentaje').setValue(this.datosIndicador[0].porcentaje_hpc);
    this.herramientasForm.get('enero').setValue(this.datosIndicador[0].enero_hpc);
    this.herramientasForm.get('febrero').setValue(this.datosIndicador[0].febrero_hpc);
    this.herramientasForm.get('marzo').setValue(this.datosIndicador[0].marzo_hpc);
    this.herramientasForm.get('abril').setValue(this.datosIndicador[0].abril_hpc);
    this.herramientasForm.get('mayo').setValue(this.datosIndicador[0].mayo_hpc);
    this.herramientasForm.get('junio').setValue(this.datosIndicador[0].junio_hpc);
    this.herramientasForm.get('julio').setValue(this.datosIndicador[0].julio_hpc);
    this.herramientasForm.get('agosto').setValue(this.datosIndicador[0].agosto_hpc);
    this.herramientasForm.get('septiembre').setValue(this.datosIndicador[0].septiembre_hpc);
    this.herramientasForm.get('octubre').setValue(this.datosIndicador[0].octubre_hpc);
    this.herramientasForm.get('noviembre').setValue(this.datosIndicador[0].noviembre_hpc);
    this.herramientasForm.get('diciembre').setValue(this.datosIndicador[0].diciembre_hpc);
    this.herramientasForm.get('embarazadas').setValue(this.datosIndicador[0].numero_embarazada_hpc);

    this.originalData = this.herramientasForm.value;

    this.visibleForm = true;

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




  get dataForm(): FormArray {
    return this.herramientasForm.get('data') as FormArray;
  }

  deleteForm(formulario) {
    while (formulario.length !== 0) {
      formulario.removeAt(0)
    }
  }

}
