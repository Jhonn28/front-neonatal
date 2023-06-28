import { Component, OnInit, ViewChild } from '@angular/core';
import { BarMenu } from '../../../../../../../projects/libreria/src/lib/class/barmenu';
import { TableCoreComponent } from '../../../../../../../projects/libreria/src/lib/core/table/table.component';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';

@Component({
  selector: 'app-nivel-atencion',
  templateUrl: './nivel-atencion.component.html',
})
export class NivelAtencionComponent extends BarMenu implements OnInit {


  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {


    await this.tabTable1.setTable('th_nivel_atencion', 'ide_thnia', 1);
    this.tabTable1.getColumn('detalle_thnia').setVisualName('nivel de atención');
    this.tabTable1.getColumn('detalle_thnia').setRequired(true);
    this.tabTable1.getColumn('activo_thnia').setVisualName('activo');
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
  /*   if(this.tabTable1.isFocus()){
      this.tabTable1.delete();
    } */
  }


}
