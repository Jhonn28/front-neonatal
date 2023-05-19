import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'seg-reglas-clave',
  templateUrl: './reglas-clave.component.html',
  styles: [
  ]
})
export class ReglasClaveComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('seg_reglas_clave', 'ide_serecl', 1);
    this.tabTable1.setTitle('REGLAS DE CLAVE');
    this.tabTable1.setFormType();
    this.tabTable1.draw();
  }

  insert(): void {
    if(this.tabTable1.isFocus()){
      this.tabTable1.insert();
    }
  }

  async save(): Promise<void> {
    if(await this.tabTable1.isSave()){
      // this.tabTable1.insert();
      await this._utilService.saveScreen(this.tabTable1);
    }
  }

  delete(): void {
    if(this.tabTable1.isFocus()){
      this.tabTable1.delete();
    }
  }

}
