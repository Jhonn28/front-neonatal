import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'ind-ocho-b',
  templateUrl: './ocho-b.component.html',
})
export class OchoBComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_complicacion_obstetrica_b', 'ide_indcob', 1);
    this.tabTable1.setTitle('indicadores complicaciones obstétricas b');
    this.tabTable1.getColumn('detalle_indcob').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indcob').setRequired(true);
    await this.tabTable1.draw();
  }


  insert(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    }
  }
  async save(): Promise<void> {
    if (await this.tabTable1.isSave()) {
      await this._utilService.saveScreen(this.tabTable1);
    }
  }

  delete(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.delete();
    }
  }
}
