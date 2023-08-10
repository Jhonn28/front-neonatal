import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/lib/core/table/table.component';
import { BarMenu } from '../../../../../../../projects/libreria/src/lib/class/barmenu';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
})
export class ServicioComponent extends BarMenu implements OnInit {
  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('th_servicio', 'ide_thserv', 1);
    this.tabTable1.getColumn('detalle_thserv').setVisualName('servicio');
    this.tabTable1.getColumn('detalle_thserv').setRequired(true);
    this.tabTable1.getColumn('activo_thserv').setVisualName('activo');
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
