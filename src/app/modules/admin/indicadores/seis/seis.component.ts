import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-seis',
  templateUrl: './seis.component.html',
})
export class SeisComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_atencion_recien_nacido', 'ide_indaren', 1);
    this.tabTable1.setTitle('indicadores atencion recién nacido/a a terminado');
    this.tabTable1.getColumn('detalle_indaren').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indaren').setRequired(true);
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
