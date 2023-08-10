import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-mes',
  templateUrl: './mes.component.html',
})
export class MesComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('ind_tiempo', 'ide_indtp', 1);
    this.tabTable1.getColumn('detalle_indtp').setVisualName('mes/tiempo');
    this.tabTable1.getColumn('detalle_indtp').setRequired(true);
    await this.tabTable1.draw();

  }

  ngOnInit(): void {
  }


  insert(): void {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')

  }
  async save() {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')
  }
  delete(): void {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')
  }

}
