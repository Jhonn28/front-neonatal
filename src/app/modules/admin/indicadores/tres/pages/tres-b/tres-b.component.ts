import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'ind-tres-b',
  templateUrl: './tres-b.component.html',
})
export class TresBComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {

    await this.tabTable1.setTable('ind_atencion_par', 'ide_indaten', 1);
    this.tabTable1.setTitle('atención del parto');
    this.tabTable1.getColumn('detalle_indaten').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indaten').setRequired(true);
    await this.tabTable1.draw();

    this.tabTable1.onFocusTable();
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
