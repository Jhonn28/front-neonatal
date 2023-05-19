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
    this.tabTable1.getColumn('ide_indare').setDropdown('ind_area','ide_indare','detalle_indare');
    this.tabTable1.getColumn('ide_indare').setRequired(true);
    this.tabTable1.getColumn('numero_indns').setRequired(true);
    this.tabTable1.getColumn('numero_indns').setVisualName('numero');
    this.tabTable1.getColumn('ide_seges').setDefaultValue(this._utilService.getSucursal());
    this.tabTable1.getColumn('ide_seges').setVisible(false);
    this.tabTable1.setConditions({condition:'ide_seges=$1',values:[this._utilService.getSucursal()]})
    await this.tabTable1.draw();

  }

  ngOnInit(): void {
  }


  insert(): void {

    if(this.tabTable1.isFocus()){
      this.tabTable1.insert();
    }
  }
  async save() {

    if(await this.tabTable1.isSave()){
      await this._utilService.saveScreen(this.tabTable1);
    }
  }
  delete(): void {
    if(this.tabTable1.isFocus()){
      this.tabTable1.delete();
    }
  }


}
