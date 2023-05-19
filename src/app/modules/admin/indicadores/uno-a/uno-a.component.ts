import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-uno-a',
  templateUrl: './uno-a.component.html',
})
export class UnoAComponent extends BarMenu implements  OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;
  @ViewChild('tabTable2', { static: false }) tabTable2: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('ind_area', 'ide_indare', 1);
    this.tabTable1.setTitle('Indicadores de insumos, equipos y medicamentos esenciales');
    this.tabTable1.addRelation(this.tabTable2);
    this.tabTable1.getColumn('detalle_indare').setVisualName('área');
    this.tabTable1.getColumn('detalle_indare').setRequired(true);
    await this.tabTable1.draw();

    await this.tabTable2.setTable('ind_insumo', 'ide_indins', 2);
    this.tabTable2.getColumn('detalle_indis').setVisualName('insumo');
    this.tabTable2.getColumn('detalle_indis').setRequired(true);
    await this.tabTable2.draw();

  }

  ngOnInit(): void {
  }


  insert(): void {

    if(this.tabTable1.isFocus()){
      this.tabTable1.insert();
    }else if(this.tabTable2.isFocus()){
      this.tabTable2.insert();
    }
  }

  async save() {
    this.tabTable1.onFocusTable();
    if(await this.tabTable1.isSave()){
      if(await this.tabTable2.isSave()){
        await this._utilService.saveScreen(this.tabTable1,this.tabTable2);
      }
    }
  }

  delete(): void {
    if(this.tabTable1.isFocus()){
      this.tabTable1.delete();
    }else if(this.tabTable2.isFocus()){
      this.tabTable2.delete();
    }
  }

}
