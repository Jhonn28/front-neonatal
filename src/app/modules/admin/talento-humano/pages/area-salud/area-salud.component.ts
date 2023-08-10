import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-area-salud',
  templateUrl: './area-salud.component.html',
})
export class AreaSaludComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('th_area_salud', 'ide_thas', 1);
    this.tabTable1.getColumn('detalle_thas').setVisualName('área de salud');
    this.tabTable1.getColumn('detalle_thas').setRequired(true);
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
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')
  }


}
