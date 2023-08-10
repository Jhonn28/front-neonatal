import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '../../../../../../../projects/libreria/src/lib/class/barmenu';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/lib/core/table/table.component';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
})
export class ProvinciaComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;
  @ViewChild('tabTable2', { static: false }) tabTable2: TableCoreComponent;
  @ViewChild('tabTable3', { static: false }) tabTable3: TableCoreComponent;

  total = 0;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {

    await this.tabTable1.setTable('th_provincia', 'ide_thprov', 1);
    this.tabTable1.setTitle('Provincia');
    this.tabTable1.addRelation(this.tabTable2);
    this.tabTable1.getColumn('detalle_thprov').setVisualName('provincia');
    this.tabTable1.getColumn('activo_thprov').setVisualName('activo');
    await this.tabTable1.draw();

    await this.tabTable2.setTable('th_ciudad', 'ide_thciu', 2);
    this.tabTable2.addRelation(this.tabTable3);
    this.tabTable2.setTitle('Cantón');
    this.tabTable2.getColumn('activo_thciu').setVisualName('activo');
    await this.tabTable2.draw();

    await this.tabTable3.setTable('th_parroquia', 'ide_thparr', 3)
    this.tabTable3.setTitle('Parroquia');
    this.tabTable3.getColumn('detalle_thparr').setVisualName('parroquia');
    this.tabTable3.getColumn('activo_thparr').setVisualName('activo');
    await this.tabTable3.draw();
  }
  ngOnInit(): void {

  }



  insert(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    } else if (this.tabTable2.isFocus()) {
      this.tabTable2.insert();
    } else if (this.tabTable3.isFocus()) {
      console.log("inserta tabla 3");
      this.tabTable3.insert();
    }
  }
  async save(): Promise<void> {


    if (await this.tabTable1.isSave()) {
      if (await this.tabTable2.isSave()) {
        if (await this.tabTable3.isSave()) {
          this.tabTable1.onFocusTable();
          await this._utilService.saveScreen(this.tabTable1, this.tabTable2, this.tabTable3);

        }

      }


    }
  }

  delete(): void {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')

  }

}
