import { Component, OnInit } from '@angular/core';
import { ColumnCore } from '../../class';
import { IResultData, ISearchFilters } from '../../interfaces';
import { MethodsService } from '../../services/methods.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'cmp-overlay-panel',
  templateUrl: './overlay-panel.component.html',
  styleUrls: []
})
export class OverlayPanelComponent implements OnInit {

  isLoading: boolean = false;
  width = '700px';
  selectedProduct: [];
  displayModal: boolean;
  data = [];
  uidSelect: number = null;
  // Servicio
  private _service: string;
  private _parameters: any;
  _columns: ISearchFilters[];
  private _primaryField: string;
  title: string = 'Título';

  // Eventos
  onChange?: (event?: any) => void;

  constructor(private _methodService: MethodsService, private _utilService: UtilsService) { }

  ngOnInit(): void {
    let columns: ISearchFilters[] = [{
      "value": "cedula",
      "name": "Cedula",
      "type": "string"
    }
    ]//'ide_gtemp,documento_identidad_gtemp,apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp';
    //this.selTable1.setTableSelectionService(`contabilidad/getCatalogoCuentaAnio/true/1`,[],'ide_cocac',columns);

    this.setTableService('general/getEmpleado', null, 'ide_gtemp', columns);
    // this.setSize('lg');
  }

  setTableService(service: string, parameters: {}, primaryField: string, columnsFilter: ISearchFilters[]) {
    this._service = service;
    this._parameters = parameters;
    this._primaryField = primaryField;
    this._columns = columnsFilter;
    console.log(this._columns);

  }

  showModalDialog() {
    this.displayModal = true;
  }

  onRowSelect(event) {

    this.uidSelect = event.data.label;
    this.data = null;
    this.hide();
    //console.warn('Producto seleccionado, >> ', event);
   /* if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }*/
    
    // this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
  }

  search() {
    this._utilService.showSpinner();
    this.isLoading = true;
    if (this._parameters) {
      this._methodService.post(this._service, this._parameters).subscribe((res: IResultData) => {
        console.log('Respiuesta >> ', res);
        this.data = res.data;
        this._utilService.hideSpinner();
        this.isLoading = false;
      })
    } else {
      this._methodService.get(this._service).subscribe((res: IResultData) => {
        console.log('Respiuesta >> ', res);
        this.data = res.data;
        this._utilService.hideSpinner();
        this.isLoading = false;
      })
    }
  }

  setSize(size: 'lg' | 'xl') {
    if (size == 'lg') {
      this.width = '800px';
    } else if (size == 'xl') {
      this.width = '1140px';
    }
  }

  onHide() {
    this.data = [];
  }

  hide(){
    this.displayModal = false;
  }

}
