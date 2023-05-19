import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'seg-correo',
  templateUrl: './correo.component.html',
  styles: [
  ]
})
export class CorreoComponent extends BarMenu implements AfterViewInit {

  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  total = 0;

  constructor(private _utilService: UtilsService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.tabTable1.setTable('seg_correo', 'ide_segcorr', 1);
    this.tabTable1.setTitle('correo');
    this.tabTable1.getColumn('smtp_segcorr').setVisualName('Host de correo');
    this.tabTable1.getColumn('smtp_segcorr').setHelp('Insertar la dirección del host de correo');
    this.tabTable1.getColumn('smtp_segcorr').setPlaceholder('smtp.google.com');
    this.tabTable1.getColumn('puerto_segcorr').setVisualName('Puerto de correo');
    this.tabTable1.getColumn('puerto_segcorr').setHelp('Insertar el puerto de correo');
    this.tabTable1.getColumn('puerto_segcorr').setPlaceholder('25');
    this.tabTable1.getColumn('usuario_segcorr').setVisualName('Nombre de usuario');
    this.tabTable1.getColumn('usuario_segcorr').setHelp('Insertar el nombre de usuario del correo la mayoría de los servicios usan el correo electrónico como nombre de usuario');
    this.tabTable1.getColumn('usuario_segcorr').setPlaceholder('Usuario');
    this.tabTable1.getColumn('correo_segcorr').setVisualName('Correo electrónico del remitente');
    this.tabTable1.getColumn('correo_segcorr').setHelp('Insertar la dirección de correo electrónico del remitente');
    this.tabTable1.getColumn('correo_segcorr').setPlaceholder('example@mail.com');
    this.tabTable1.getColumn('clave_segcorr').setVisualName('Contraseña de correo');
    this.tabTable1.getColumn('clave_segcorr').setHelp('Insertar la contraseña del correo');
    this.tabTable1.getColumn('clave_segcorr').setPassword();
    this.tabTable1.getColumn('smtpsecure_segcorr').setVisualName('smtp secure');
    this.tabTable1.getColumn('activo_segcorr').setVisualName('activo');
    this.tabTable1.setFormType();
    await this.tabTable1.draw();
  }


  insert(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    }
  }
  async save(): Promise<void> {
    let activo = 0;
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
