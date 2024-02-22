import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ExcelService } from 'app/services/excel.service';

@Component({
  selector: 'app-distrito-trimestre',
  templateUrl: './distrito-trimestre.component.html',
  styleUrls: ['./distrito-trimestre.component.scss']
})
export class DistritoTrimestreComponent implements OnInit {

  visual_excel: Boolean = false;
  reporteForm: FormGroup = new FormGroup({});
  trimestres = [
    { value: 1, label: 'Enero - Marzo' },
    { value: 2, label: 'Abril - Junio' },
    { value: 3, label: 'Julio - Septiembre' },
    { value: 4, label: 'Octubre - Diciembre' },
  ]
  constructor(
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _excelService: ExcelService
  ) { }

  ngOnInit(): void {

    this.reporteForm = this._formBuilder.group({
      anio: [, Validators.required],
      trimestre: [, Validators.required],
      distrito: [this._utilService.getEmpresa()],
    })
  }
  async buscar() {
    console.log(this.reporteForm);
    if (this.reporteForm.controls.anio.status === 'INVALID') {
      this._utilService.addWarningMessage('El año de búsqueda es obligatorio.');
      return;
    }

    if (this.reporteForm.controls.trimestre.status === 'INVALID') {
      this._utilService.addWarningMessage('El trimestre de búsqueda es obligatorio.');
      return;
    }
    this.visual_excel = await this._excelService.reporteDistritoTrimestral(this._utilService.getFormatDate(this.reporteForm.value.anio, 'yyyy'),this.reporteForm.value.trimestre);

  }
  descargar() {
    this._excelService.downloadExcel();
  }

  limpiar(){
    this.reporteForm.reset();
    this.reporteForm.get('distrito').setValue(this._utilService.getEmpresa());
  }


}
