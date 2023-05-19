import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styles: [
  ]
})
export class ParametrosComponent implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;
  constructor() { }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('seg_parametros', 'ide_segpar',1);
    this.tabTable1.getColumn('tabla_segpar').setVisible(false);
    this.tabTable1.getColumn('campo_codigo_segpar').setVisible(false);
    this.tabTable1.getColumn('campo_nombre_segpar').setVisible(false);
    this.tabTable1.draw();
  }

}
