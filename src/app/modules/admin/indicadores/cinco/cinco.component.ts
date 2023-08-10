import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-cinco',
  templateUrl: './cinco.component.html',
})
export class CincoComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_atencion_post_parto', 'ide_indpospar', 1);
    this.tabTable1.setTitle('indicadores atención del post-parto');
    this.tabTable1.getColumn('detalle_indpospar').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indpospar').setRequired(true);
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
