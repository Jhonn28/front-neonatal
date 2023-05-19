import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'seg-permisos',
  templateUrl: './permisos.component.html',
  styles: [
    'input{ width:100% !important; }'


  ]
})
export class PermisosComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;
  @ViewChild('tabTable2', { static: false }) tabTable2: TableCoreComponent;
  @ViewChild('tabTable3', { static: false }) tabTable3: TableCoreComponent;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('seg_perfil', 'ide_segper', 1);
    this.tabTable1.addRelation(this.tabTable2);
    this.tabTable1.addRelation(this.tabTable3);
    this.tabTable1.setTitle('Perfiles del sistema');
    this.tabTable1.getColumn('ide_segper').setVisualName('código');
    this.tabTable1.getColumn('nombre_segper').setVisualName('nombre');
    this.tabTable1.getColumn('descripcion_segper').setVisualName('descripción');
    this.tabTable1.getColumn('activo_segper').setVisualName('activo');
    this.tabTable1.getColumn('perm_util_segper').setVisualName('perm util');
    await this.tabTable1.draw();

    await this.tabTable2.setTable('seg_perfil_opcion', 'ide_sepeop', 2);
    this.tabTable2.setTitle('Permisos de menú del perfil ' + this.tabTable1.getValue('nombre_segper'));
    this.tabTable2.getColumn('ide_segopc').setDropdownService('seguridad/opciones');
    this.tabTable2.getColumn('ide_segopc').setAutocomplete();
    this.tabTable2.getColumn('ide_sepeop').setVisualName('código');
    this.tabTable2.getColumn('ide_segopc').setVisualName('opción');
    this.tabTable2.getColumn('ide_segopc').setRequired(true);
    this.tabTable2.getColumn('ide_segopc').setComment('Opciones disponibles del sistema');
    //this.tabTable2.getColumn('lectura_sepeop').setVisualName('lectura');
    await this.tabTable2.draw();

    await this.tabTable3.setTable('seg_perfil_reglas_clave', 'ide_seperc', 3);
    this.tabTable3.setTitle('Reglas clave');
    this.tabTable3.getColumn('ide_seperc').setVisualName('código');
    this.tabTable3.getColumn('ide_serecl').setVisualName('REGLA');
    this.tabTable3.getColumn('activo_seperc').setVisualName('ACTIVO');
    // this.tabTable3.getColumn('activo_seperc').setWidth(9);
    this.tabTable3.getColumn('ide_serecl').setDropdown('seg_reglas_clave', 'ide_serecl', 'nombre_serecl');
    await this.tabTable3.draw();

    //TODO: cambio titulo tabla 3
    this.tabTable1.onSelecciona = () => {
      this.tabTable2.setTitle('Permisos de menú del perfil ' + this.tabTable1.getValue('nombre_segper'));
    }
  }

  insert(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    } else if (this.tabTable2.isFocus()) {
      this.tabTable2.insert();
    } else if (this.tabTable3.isFocus()) {
      this.tabTable3.insert();
    }
  }
  async save(): Promise<void> {
    this.tabTable1.onFocusTable();
    if (await this.tabTable1.isSave()) {
      if (await this.tabTable2.isSave()) {
        if (await this.tabTable3.isSave()) {
          await this._utilService.saveScreen(this.tabTable1, this.tabTable2, this.tabTable3);
        }
      }
    }
  }
  delete(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.delete();
    } else if (this.tabTable2.isFocus()) {
      console.log(this.tabTable2.getRowSelected());
      this.tabTable2.delete();
    } else if (this.tabTable3.isFocus()) {
      this.tabTable3.delete();
    }
  }

}
