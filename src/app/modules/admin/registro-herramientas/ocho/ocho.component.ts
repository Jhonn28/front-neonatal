import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-ocho',
  templateUrl: './ocho.component.html',
  styleUrls: ['./ocho.component.scss']
})
export class OchoComponent implements OnInit {

  datosSucursal;


  indicadores;
  tiempo;
  area_salud;

  numerador: number = 0;
  denominador: number = 0;
  porcentaje: number = 0;

  suma: number = 0;
  //variables de promedio;
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


  //TODO: formulario
  herramientasForm: FormGroup = new FormGroup({});


  constructor(private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _indicadorService: IndicadorService
  ) {
    this.datosSucursal = _route.snapshot.data['info'][0];
    this.tiempo = _route.snapshot.data['info'][1];
    this.area_salud = _route.snapshot.data['info'][2];
    this.initForm();

  }

  async ngOnInit(): Promise<void> {


  }


  //iniciamos Formulario
  initForm(): void {
    this.herramientasForm = this._formBuilder.group({
      provincia: [this.datosSucursal.provincia],
      area_salud: [],
      unidad_operativa: [this.datosSucursal.establecimiento],
      fecha_medicion: [this._utilService.getDateCurrent()],
      mes_evaluado: [, Validators.required],
      responsable_medicion: [this.datosSucursal.responsable_establecimiento],
      insumos: this._formBuilder.array([]),
      promedio: this._formBuilder.array([]),
    })
  }




  //guarda data
  async saveData(event: any) {

    if(this.insumosForm.value.length==0){
      this._utilService.toast_warning('Ingrese al menos un registro');
      return;
    }
    if (this.insumosForm.invalid) {
      this._utilService.toast_warning('Ingrese número de historia clínica');
      return;
    }
    if (this.herramientasForm.invalid) {
      this._utilService.toast_warning('Existen campos inválidos.');
      return;
    }

    let cod_invalid='';
    let reg=0;

    this.insumosForm.value.forEach(element => {
      if(element.nro_historia_clinica_hco.length>0){
        if(element.nro_historia_clinica_hco.length!=10){
          cod_invalid+=element.nro_historia_clinica_hco+' ';
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

    const codigos = await this.filterCodigo(this.insumosForm.value);

    if(codigos.length!=reg){
      this._utilService.toast_warning('Existen números de historía clínica que se repiten.');
      return;
    }

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
        nro_herramienta_heg: '8'
      }
    );

    this.promedioForm.push(this._formBuilder.group({
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
    }))
    const data = new Object({
      cabecera: cabecera,
      indicadores: this.insumosForm.value,
      promedio: this.promedioForm.value
    })

    console.log('datos=>', data);
    await this._indicadorService.saveData(data, 'her_encabezado_general', 'ide_heg', 'her_complicacion_obstetrica', 'tabla3=her_promedio_complicacion_obste').subscribe(async (res: any) => {
      if(res){
      this.deleteForm(this.insumosForm);
      this.deleteForm(this.promedioForm);
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
      }

    });


  }


  insertRow() {
    this.insumosForm.push(this._formBuilder.group({
      nro_historia_clinica_hco: [, [Validators.required, Validators.pattern("^[0-9]*$")]],
      hemorragia_hco: [false, Validators.required],
      septico_hco: [false, Validators.required],
      ectopico_hco: [false, Validators.required],
      hidatiforme_hco: [false, Validators.required],
      placenta_hco: [false, Validators.required],
      desprendimiento_hco: [false, Validators.required],
      ruptura_hco: [false, Validators.required],
      retencion_hco: [false, Validators.required],
      atonia_hco: [false, Validators.required],
      inversion_hco: [false, Validators.required],
      desgarro_hco: [false, Validators.required],
      coagulo_hco: [false, Validators.required],
      parto_obstruido_hco: [false, Validators.required],
      sepsis_hco: [false, Validators.required],
      pre_eclampsia_hco: [false, Validators.required],
      amenaza_hco: [false, Validators.required],
      cesarea_hco: [false, Validators.required],
    }));
  }

  onDeleteRow(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
    this.promedio(formArray);
  }

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


  reset(event: any) {
    event.reset();
    this.deleteForm(this.insumosForm);

  }

  get insumosForm(): FormArray {
    return this.herramientasForm.get('insumos') as FormArray;
  }


  get promedioForm(): FormArray {
    return this.herramientasForm.get('promedio') as FormArray;
  }

  filterCodigo(array) {
    let hash = {};
    array = array.filter(function (current) {
      let exists = !hash[current.nro_historia_clinica_hco];
      hash[current.nro_historia_clinica_hco] = true;
      return exists;
    });
    return array;
  }

}
