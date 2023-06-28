import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '../../../../../../../projects/libreria/src/lib/class/barmenu';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/lib/core/table/table.component';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';

@Component({
  selector: 'app-tipo-establecimiento',
  templateUrl: './tipo-establecimiento.component.html',
})
export class TipoEstablecimientoComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('th_tipo_establecimiento', 'ide_thtipes', 1);
    this.tabTable1.getColumn('detalle_thtipes').setVisualName('tipo establecimiento');
    this.tabTable1.getColumn('detalle_thtipes').setRequired(true);
    this.tabTable1.getColumn('activo_thtipes').setVisualName('activo');
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
    /* if(this.tabTable1.isFocus()){
      this.tabTable1.delete();
    } */
  }
}
