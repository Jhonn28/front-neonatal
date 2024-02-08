import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, SystemService, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';
import * as bcrypt from 'bcryptjs';
import { TalentoHumanoService } from 'app/services/talento-humano.service';
import { getValue } from '@ngneat/transloco';
import { ITemporalPassword } from '../../../../../../../projects/libreria/src/lib/interfaces/temporal-password.interface';

@Component({
  selector: 'seg-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent extends BarMenu implements AfterViewInit {
  usuario;
  user_insert;
  nombre: any;
  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;
  @ViewChild('tabTable2', { static: false }) tabTable2: TableCoreComponent;
  @ViewChild('tabTable3', { static: false }) tabTable3: TableCoreComponent;

  constructor(
    private _utilService: UtilsService,
    private _systemService: SystemService,
    private _talentoHumanoService: TalentoHumanoService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {

    //datos de usuario
    this.usuario = await this._talentoHumanoService.getByUser(this._utilService.getUsername());

    //carga tabla
    await this.tabTable1.setTable('seg_usuario', 'ide_segusu', 1);
    this.tabTable1.addRelation(this.tabTable2);
    this.tabTable1.addRelation(this.tabTable3);
    this.tabTable1.setTitle('REGISTRO DE USUARIOS');

    this.tabTable1.getColumn('ide_segper').setDropdown('seg_perfil', 'ide_segper', 'nombre_segper');
    this.tabTable1.getColumn('ide_segper').setRequired(true);
    this.tabTable1.getColumn('ide_segper').setWidth(10);
    this.tabTable1.getColumn('ide_segper').setVisualName('perfil');

    this.tabTable1.getColumn('username_segusu').setVisualName('username');
    this.tabTable1.getColumn('username_segusu').setWidth(10);



    this.tabTable1.getColumn('nombre_segusu').setVisualName('usuario');
    this.tabTable1.getColumn('nombre_segusu').setWidth(15);


    this.tabTable1.getColumn('correo_segusu').setRequired(true);
    this.tabTable1.getColumn('correo_segusu').setVisualName('correo');
    this.tabTable1.getColumn('correo_segusu').setComment('Ingresar un correo valido, el correo ingresado sera usado para enviar las instrucciones en caso de reestablecer la contraseña.');
    this.tabTable1.getColumn('correo_segusu').setWidth(15);


    this.tabTable1.getColumn('fecha_reg_segusu').setRead(true);
    this.tabTable1.getColumn('fecha_reg_segusu').setVisualName('fecha registro');
    this.tabTable1.getColumn('fecha_reg_segusu').setDefaultValue(this._utilService.getDateCurrent('yyyy-MM-dd'));
    this.tabTable1.getColumn('fecha_reg_segusu').setWidth(5);
    this.tabTable1.getColumn('fecha_reg_segusu').setVisible(false);

    this.tabTable1.getColumn('activo_segusu').setRead(true);
    this.tabTable1.getColumn('activo_segusu').setWidth(5);
    this.tabTable1.getColumn('activo_segusu').setVisualName('activo');
    this.tabTable1.getColumn('activo_segusu').setDefaultValue(true);

    this.tabTable1.getColumn('bloqueado_segusu').setDefaultValue(false);
    this.tabTable1.getColumn('bloqueado_segusu').setVisualName('bloqueado');
    this.tabTable1.getColumn('bloqueado_segusu').setRead(true);
    this.tabTable1.getColumn('bloqueado_segusu').setWidth(5);

    this.tabTable1.getColumn('fecha_caduc_segusu').setVisualName('fecha caduca');
    this.tabTable1.getColumn('fecha_caduc_segusu').setVisible(false);

    this.tabTable1.getColumn('cambia_clave_segusu').setRead(true);
    this.tabTable1.getColumn('cambia_clave_segusu').setWidth(5);
    this.tabTable1.getColumn('cambia_clave_segusu').setVisualName('cambia clave');

    this.tabTable1.getColumn('admin_multi_segusu').setVisualName('admin. distrital');
    this.tabTable1.getColumn('admin_multi_segusu').setDefaultValue(false);
    this.tabTable1.getColumn('admin_multi_segusu').setWidth(5);

    this.tabTable1.getColumn('zonal_segusu').setVisualName('admin. zonal');
    this.tabTable1.getColumn('zonal_segusu').setDefaultValue(false);
    this.tabTable1.getColumn('zonal_segusu').setWidth(5);


    this.tabTable1.getColumn('ide_seges').setDefaultValue(this._utilService.getSucursal());
    this.tabTable1.getColumn('ide_seges').setVisible(false);

    this.tabTable1.getColumn('ide_segdis').setDefaultValue(this._utilService.getEmpresa());
    this.tabTable1.getColumn('ide_segdis').setVisible(false);

    this.tabTable1.getColumn('foto_segusu').setUpload();
    this.tabTable1.getColumn('foto_segusu').setVisible(false);

    this.tabTable1.getColumn('reset_send_segusu').setVisualName('reset send');
    this.tabTable1.getColumn('reset_send_segusu').setDefaultValue(false);
    this.tabTable1.getColumn('reset_send_segusu').setWidth(5);
    this.tabTable1.getColumn('reset_send_segusu').setVisible(false);

    this.tabTable1.getColumn('tema_segusu').setVisualName('tema');
    this.tabTable1.getColumn('tema_segusu').setVisible(false);


    await this.tabTable1.draw();


    await this.tabTable2.setTable('seg_usuario_multisucursal', 'ide_segmus', 2);

    this.tabTable2.setTitle('Establecimientos de ' + this.tabTable1.getValue('username_segusu'));

    this.tabTable2.getColumn('ide_segdis').setStyle('font-weight: bold; color: red;');
    this.tabTable2.getColumn('ide_segdis').setRequired(true);
    this.tabTable2.getColumn('ide_segdis').setDropdownService(`seguridad/empresa`);
    this.tabTable2.getColumn('ide_segdis').setVisualName('distrito');
    this.tabTable2.getColumn('ide_segdis').setRead(true);

    this.tabTable2.getColumn('ide_seges').setRequired(true);
    this.tabTable2.getColumn('ide_seges').setVisualName('establecimiento');
    this.tabTable2.getColumn('ide_seges').setRead(true);

    this.tabTable2.getColumn('activo_segmus').setVisualName('activo');
    this.tabTable2.getColumn('activo_segmus').setComment('Se activa cuando es necesario dar acceso al establecimiento');
    this.tabTable2.getColumn('activo_segmus').setRequired(false);


    this.tabTable2.getColumn('ide_seges').setDropdownService('seguridad/establecimientos');

    await this.tabTable2.draw();


    await this.tabTable3.setTable('seg_usuario_clave', 'ide_seuscl', 3);
    this.tabTable3.setTitle('clave');
    this.tabTable3.getColumn('fecha_registro_seuscl').setVisualName('fecha registro');
    this.tabTable3.getColumn('fecha_vence_seuscl').setVisualName('fecha vence');
    this.tabTable3.getColumn('activo_seuscl').setVisualName('activo');
    this.tabTable3.getColumn('activo_seuscl').setDefaultValue(true);
    this.tabTable3.getColumn('clave_seuscl').setRead(true);
    this.tabTable3.getColumn('fecha_registro_seuscl').setRead(true);
    this.tabTable3.getColumn('fecha_registro_seuscl').setDefaultValue(this._utilService.getDateCurrent('yyyy-MM-dd'));
    await this.tabTable3.draw();

    //TODO: cambia titulo de tabla 2
    this.tabTable1.onSelecciona = () => {
      this.tabTable2.setTitle('Establecimientos de ' + this.tabTable1.getValue('username_segusu'));
    }


  }

  insert(): void {

    if(this.tabTable1.isRowInserted()){
      this._utilService.addWarningMessage('Solo puede insertar un registro.');
      return;
    }

    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    }


  }

  async save(): Promise<void> {
    let resultado;

    this.tabTable1.onFocusTable();

    if (await this.tabTable1.isSave()) {
      //TODO: valida correo
      if (!this._utilService.isEmailValid(this.tabTable1.getValue('correo_segusu'))) {
        this._utilService.addWarningMessage('Correo electrónico inválido.');
        return;
      }

      let existe;
      let message='';
      if(this.tabTable1.getValue('zonal_segusu')){
        existe = await this._talentoHumanoService.getExisteEstablecimiento();
        message='Se presento un error al crear al usuario <strong>';
      }else if(!this.tabTable1.getValue('admin_multi_segusu')){
        existe = await this._talentoHumanoService.getExisteEstablecimiento('unicodigo='+this.tabTable1.getValue('username_segusu'));
          message='No se encuentra registrado un establecimiento con el unicódigo <strong>';
        console.log('entro false');
      }else{
        existe = await this._talentoHumanoService.getExisteEstablecimiento('distrito='+this.tabTable1.getValue('username_segusu'));
        message='No se encuentra registrado un distrito con el número <strong>';
        console.log('entro a true');
      }

      



      if (existe.length === 0) {
        this._utilService.addWarningMessage( message+ this.tabTable1.getValue('username_segusu') + '</strong>');
        return;
      }

      resultado = this._utilService.encontrarDuplicados(this.tabTable1.table.data, ('username_segusu'));

      if (resultado.length > 0) {
        this._utilService.addMessageInfo(`No se puede registrar 2 veces el mismo usuario ${resultado}.`);
        return;
      }

      this.tabTable2.insert();
      this.tabTable2.setValue('ide_segdis', existe[0].distrito);
      this.tabTable2.setValue('ide_seges', existe[0].establecimiento);

      if (await this.tabTable2.isSave()) {

        //set password
        const pass = this.tabTable1.getValue('username_segusu');

        const newPassword = bcrypt.hashSync(pass, 10); //hash password
        this.tabTable3.insert();
        this.tabTable3.setValue('clave_seuscl', newPassword);


        if (await this.tabTable3.isSave()) {
        await this._utilService.saveScreen(this.tabTable1,this.tabTable2, this.tabTable3);
        }
      }
    }
  }

  delete(): void {
    this._utilService.toast_info('Esta opción se encuentra deshabilitada en el sistema.')
  }

  questionActive(): void {
    const ide_segusu = this.tabTable1.getValue('ide_segusu');
    const estado = this.tabTable1.getValue('activo_segusu');
    const activo = (estado) ? 'DESACTIVAR' : 'ACTIVAR';
    this._utilService.confirmationAlert(`Desea <strong>${activo}</strong> al usuario <strong>${this.tabTable1.getValue('nombre_segusu')}</strong>`, () => this.activeUser(ide_segusu, estado), 'CONFIRMAR');
  }

  async activeUser(ide_segusu: number, estado: boolean): Promise<void> {

    this.tabTable1.setValue('activo_segusu', `${!estado}`);
    this._systemService.activateDisableUser(ide_segusu, !estado).subscribe(async (res) => {
      await this.tabTable1.update();
      this._utilService.addMessageSuccess(res);
    });
  }

  questionBlockUser(): void {
    const ide_segusu = this.tabTable1.getValue('ide_segusu');
    const estado = this.tabTable1.getValue('bloqueado_segusu');
    const activo = (estado) ? 'DESBLOQUEAR' : 'BLOQUEAR';
    this._utilService.confirmationAlert(`Desea <strong>${activo}</strong> al usuario <strong>${this.tabTable1.getValue('nombre_segusu')}</strong>`, () => { this.unblockUser(ide_segusu, estado) }, 'CONFIRMAR');
  }

  async unblockUser(ide_segusu: number, estado: boolean): Promise<void> {
    this._systemService.blockUnblockUser(ide_segusu, !estado).subscribe(async (res) => {
      await this.tabTable1.update();
      this._utilService.addMessageSuccess(res);
    });
  }

  passwordGenerated(): void {
    const password = this._utilService.generatedPassword();
    const ide_segusu = this.tabTable1.getValue('ide_segusu');
    const nombre_segusu = this.tabTable1.getValue('nombre_segusu');
    this._utilService.confirmationAlert(`El sistema ha generado una nueva clave para el usuario <strong>${nombre_segusu}</strong>, para asignar la clave y enviar al correo seleccione <strong>Aceptar</strong><br><br><center style="color: red;font-weight: 800;font-size: 1.5rem;">${password}</center>`, () => { this.generatedPassword(password, ide_segusu) }, 'CLAVE TEMPORAL GENERADA');
  }

  async generatedPassword(password: string, ide_segusu: number): Promise<void> {

    const temporalPassword = {
      newPassword: password,
      user: ide_segusu
    }

    this._systemService.generateTemporaryPassword(temporalPassword).subscribe((res) => {
      this._utilService.addMessageSuccess(res);
    })
  }

}
