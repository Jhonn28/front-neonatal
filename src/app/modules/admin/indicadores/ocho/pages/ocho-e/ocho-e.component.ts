import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'ind-ocho-e',
  templateUrl: './ocho-e.component.html',
})
export class OchoEComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_complicacion_obstetrica_e', 'ide_indcoe', 1);
    this.tabTable1.setTitle('indicadores complicaciones obstétricas e');
    this.tabTable1.getColumn('detalle_indcoe').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indcoe').setRequired(true);
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
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')

  }
}
