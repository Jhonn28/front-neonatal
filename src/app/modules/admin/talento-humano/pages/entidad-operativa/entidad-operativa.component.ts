import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '../../../../../../../projects/libreria/src/lib/class/barmenu';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/lib/core/table/table.component';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';

@Component({
  selector: 'app-entidad-operativa',
  templateUrl: './entidad-operativa.component.html',
})
export class EntidadOperativaComponent extends BarMenu implements OnInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('th_entidad_operativa', 'ide_thento', 1);
    this.tabTable1.getColumn('detalle_thento').setVisualName('entidad operativa desconcentrada');
    this.tabTable1.getColumn('detalle_thento').setRequired(true);
    this.tabTable1.getColumn('activo_thento').setVisualName('activo');
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
