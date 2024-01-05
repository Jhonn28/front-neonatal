import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-numero-sala',
  templateUrl: './numero-sala.component.html',
})
export class NumeroSalaComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('ind_numero_sala', 'ide_indns', 1);
    this.tabTable1.getColumn('ide_indare').setVisualName('nivel de atención');
    this.tabTable1.getColumn('ide_indare').setRead(true);
    this.tabTable1.getColumn('ide_indare').setDropdown('ind_area', 'ide_indare', 'detalle_indare');
    this.tabTable1.getColumn('ide_indare').setRequired(true);
    this.tabTable1.getColumn('numero_indns').setRequired(true);
    this.tabTable1.getColumn('numero_indns').setVisualName('numero');
    this.tabTable1.getColumn('ide_seges').setDefaultValue(this._utilService.getSucursal());
    this.tabTable1.getColumn('ide_seges').setVisible(false);
    this.tabTable1.setConditions({ condition: 'ide_seges=$1', values: [this._utilService.getSucursal()] })
    await this.tabTable1.draw();

  }

  ngOnInit(): void {
  }


  insert(): void {
    if (this.tabTable1.isRowInserted()) {
      this._utilService.toast_info('Ya se encuentran insertado registros');
      return;
    }
    if (this.tabTable1.isFocus()) {

      for(let i=this.tabTable1.table.columns[2].listDropdown.length-1;i>0;i--){
        console.log(this.tabTable1.table.columns[2].listDropdown[i],i);
        this.tabTable1.insert();
        this.tabTable1.setValue('ide_indare', this.tabTable1.table.columns[2].listDropdown[i].value);
      }
    }
  }
  async save() {
    let invalid = false;
    if (await this.tabTable1.isSave()) {
      console.log(this.tabTable1.table.data);
      this.tabTable1.table.data.forEach(element=>{
        if(element.numero_indns<0 || element.numero_indns>3){
          invalid=true;
          return;
        }
      });

      if(invalid){
        this._utilService.toast_warning('Recuerde que el número de salas no puede ser menor a 0 o mayor a 3');
        return;
      }
      //await this._utilService.saveScreen(this.tabTable1);
    }
  }
  delete(): void {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')

  }


}
