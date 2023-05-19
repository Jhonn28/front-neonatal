import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
})
export class DosComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('ind_prenatal', 'ide_indpren', 1);
    this.tabTable1.setTitle('indicadores control parental');
    this.tabTable1.getColumn('detalle_indpren').setVisualName('indicador');
    this.tabTable1.getColumn('detalle_indpren').setRequired(true);
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
