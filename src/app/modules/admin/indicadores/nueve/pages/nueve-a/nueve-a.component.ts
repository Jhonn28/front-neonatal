import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'ind-nueve-a',
  templateUrl: './nueve-a.component.html',
})
export class NueveAComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_complicacion_neonatal_a', 'ide_indcna', 1);
    this.tabTable1.setTitle('indicadores complicación neonatal a');
    this.tabTable1.getColumn('detalle_indcna').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indcna').setRequired(true);
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
