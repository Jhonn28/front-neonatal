import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../../../projects/libreria/src/public-api';
import { ExcelService } from 'app/services/excel.service';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss']
})
export class DistritoComponent implements OnInit {
  visual_excel: Boolean = false;
  reporteForm: FormGroup = new FormGroup({});
  cities = [
    {value: 1, label: 'ciudad 1'},
    {value: 2, label: 'ciudad 2'},
  ]
  constructor(
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _excelService: ExcelService
  ) { }

  ngOnInit(): void {

    this.reporteForm = this._formBuilder.group({
      anio: [,Validators.required],
      distrito: [this._utilService.getEmpresa()],
    })
  }
 async buscar(){
    if(this.reporteForm.invalid){
      this._utilService.addWarningMessage('Ingrese un año válido');
      return;
    }
    console.log(this._utilService.getFormatDate(this.reporteForm.value.anio,'yyyy'));
    this.visual_excel = await this._excelService.reporteDistrito(this._utilService.getFormatDate(this.reporteForm.value.anio,'yyyy'));

  }
  descargar(){
    this._excelService.downloadExcel();
  }

}
