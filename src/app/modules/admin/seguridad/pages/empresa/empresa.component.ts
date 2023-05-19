import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BarMenu, TableCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';
import { TalentoHumanoService } from 'app/services/talento-humano.service';

@Component({
  selector: 'seg-empresa',
  templateUrl: './empresa.component.html',
  styles: [
  ]
})
export class EmpresaComponent extends BarMenu implements AfterViewInit {

  usuario: any;

  @ViewChild('tabTable2', { static: false }) tabTable2: TableCoreComponent;
  @ViewChild('tabTable3', { static: false }) tabTable3: TableCoreComponent;

  constructor(private _utilService: UtilsService,
    private _talentoHumanoService: TalentoHumanoService) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {



    this.usuario = await this._talentoHumanoService.getByUser(this._utilService.getUsername());



    await this.tabTable2.setTable('seg_distrito', 'ide_segdis', 2);
    this.tabTable2.addRelation(this.tabTable3);
    this.tabTable2.setTitle('Distrito');
    this.tabTable2.getColumn('ide_thprov').setRequired(true);
    this.tabTable2.getColumn('nro_distrito').setRequired(true);
    this.tabTable2.getColumn('nombre_segdis').setRequired(true);
    this.tabTable2.getColumn('ide_segdis').setVisualName('código');
    this.tabTable2.getColumn('ide_thprov').setDropdown('th_provincia', 'ide_thprov', 'detalle_thprov');
    this.tabTable2.getColumn('ide_thprov').setVisualName('provincia');
    this.tabTable2.getColumn('nro_distrito').setVisualName('nro distrito');
    this.tabTable2.getColumn('nombre_segdis').setVisualName('distrito');
    this.tabTable2.getColumn('responsable_segdis').setVisualName('responsable');
    this.tabTable2.getColumn('cedula_responsable_segdis').setVisualName('cédula');
    this.tabTable2.getColumn('cedula_responsable_segdis').setOrder(5);
    await this.tabTable2.draw();


    await this.tabTable3.setTable('seg_establecimiento', 'ide_seges', 3);
    this.tabTable3.setTitle('Establecimientos del distrito ' + this.tabTable2.getValue('nro_distrito') + ' - ' + this.tabTable2.getValue('nombre_segdis'));

    this.tabTable3.getColumn('ide_seges').setVisible(false);
    this.tabTable3.getColumn('ide_thciu').setVisualName('cantón');
    this.tabTable3.getColumn('ide_thciu').setRequired(true);
    this.tabTable3.getColumn('ide_thciu').setWidth(15);
    this.tabTable3.getColumn('ide_thciu').setOrder(3);


    this.tabTable3.getColumn('ide_thparr').setVisualName('parroquia');
    this.tabTable3.getColumn('ide_thparr').setDropdown('th_parroquia', 'ide_thparr', 'detalle_thparr')
    this.tabTable3.getColumn('ide_thparr').setWidth(45);
    this.tabTable3.getColumn('ide_thparr').setOrder(4);
    this.tabTable3.getColumn('ide_thparr').setRequired(true);

    this.tabTable3.getColumn('ide_thnia').setVisualName('Nivel atencion');
    this.tabTable3.getColumn('ide_thnia').setDropdown('th_nivel_atencion', 'ide_thnia', 'detalle_thnia');
    this.tabTable3.getColumn('ide_thnia').setWidth(15);
    this.tabTable3.getColumn('ide_thnia').setOrder(7);
    this.tabTable3.getColumn('ide_thnia').setRequired(true);


    this.tabTable3.getColumn('ide_thserv').setVisualName('servicio');
    this.tabTable3.getColumn('ide_thserv').setDropdown('th_servicio', 'ide_thserv', 'detalle_thserv');
    this.tabTable3.getColumn('ide_thserv').setWidth(15);
    this.tabTable3.getColumn('ide_thserv').setOrder(8);
    this.tabTable3.getColumn('ide_thserv').setRequired(true);

    this.tabTable3.getColumn('ide_thento').setVisualName('entidad operativa desordenada');
    this.tabTable3.getColumn('ide_thento').setDropdown('th_entidad_operativa', 'ide_thento', 'detalle_thento');
    this.tabTable3.getColumn('ide_thento').setWidth(15);
    this.tabTable3.getColumn('ide_thento').setOrder(10);
    this.tabTable3.getColumn('ide_thento').setRequired(true);

    this.tabTable3.getColumn('unicodigo_seges').setVisualName('unicodigo');
    this.tabTable3.getColumn('unicodigo_seges').setWidth(15);
    this.tabTable3.getColumn('unicodigo_seges').setOrder(2);
    this.tabTable3.getColumn('unicodigo_seges').setRequired(true);

    this.tabTable3.getColumn('ide_thtipes').setVisualName('tipo establecimiento');
    this.tabTable3.getColumn('ide_thtipes').setOrder(9);
    this.tabTable3.getColumn('ide_thtipes').setDropdown('th_tipo_establecimiento', 'ide_thtipes', 'detalle_thtipes');
    this.tabTable3.getColumn('ide_thtipes').setRequired(true);

    this.tabTable3.getColumn('nombre_seges').setRequired(true);
    this.tabTable3.getColumn('nombre_seges').setVisualName('establecimiento');
    this.tabTable3.getColumn('nombre_seges').setWidth(15);
    this.tabTable3.getColumn('nombre_seges').setOrder(5);

    this.tabTable3.getColumn('direccion_seges').setVisualName('dirección');
    this.tabTable3.getColumn('direccion_seges').setWidth(25);
    this.tabTable3.getColumn('direccion_seges').setOrder(6);

    this.tabTable3.getColumn('responsable_seges').setVisualName('responsable');
    this.tabTable3.getColumn('responsable_seges').setWidth(12);

    this.tabTable3.getColumn('cedula_responsable_seges').setVisualName('cédula');
    this.tabTable3.getColumn('cedula_responsable_seges').setWidth(12);
    this.tabTable3.getColumn('cedula_responsable_seges').setOrder(10);



    this.tabTable3.getColumn('ide_thciu').setDropdownService('talento-humano/getCiudades/' + this.tabTable2.getValue('ide_thprov'));

    this.tabTable3.getColumn('ide_thparr').setDropdownService(`talento-humano/getParroquias?provincia=${this.tabTable2.getValue('ide_thprov')}`);


    await this.tabTable3.draw();

    //TODO: Actualiza lista tabla 3 cuando cambia drop

    this.tabTable2.getColumn('ide_thprov').onMetodoChange = () => {
      this.tabTable3.getColumn('ide_thciu').setDropdownService(`talento-humano/getCiudades/${this.tabTable2.getValue('ide_thprov')}`);

      this.tabTable3.getColumn('ide_thparr').setDropdownService(`talento-humano/getParroquias?provincia=${this.tabTable2.getValue('ide_thprov')}`);
      this.tabTable3.updateDropdown('ide_thciu');
      this.tabTable3.updateDropdown('ide_thparr');
    }



    this.tabTable2.onSelecciona = () => {
      //TODO: Cambio titulo

      //Actualizo dropdown canton
      if (this.tabTable2.getValue('nombre_segdis')) {
        this.tabTable3.setTitle('Establecimientos del distrito ' + this.tabTable2.getValue('nro_distrito') + ' - ' + this.tabTable2.getValue('nombre_segdis'));
        this.tabTable3.getColumn('ide_thciu').setDropdownService(`talento-humano/getCiudades/${this.tabTable2.getValue('ide_thprov')}`);
        this.tabTable3.getColumn('ide_thparr').setDropdownService(`talento-humano/getParroquias?provincia=${this.tabTable2.getValue('ide_thprov')}`);
        this.tabTable3.updateDropdown('ide_thciu');
        this.tabTable3.updateDropdown('ide_thparr');

      } else {
        this.tabTable3.setTitle('Establecimientos del distrito ');
      }
    }
  }

  insert(): void {


    if (this.tabTable2.isFocus()) {
      this.tabTable2.insert();
    } else if (this.tabTable3.isFocus()) {
      this.tabTable3.insert();
    }
  }

  async save(): Promise<void> {
    let resultado;

    let valido_dis = 0;
    let valido_es = 0;
    let cedula_dis = '';

    this.tabTable2.table.data.forEach(data => {
      if (data.cedula_responsable_segdis) {
        if (!this._utilService.validateIdentityDocument(1, data.cedula_responsable_segdis)) {
          valido_dis++;
          cedula_dis += data.cedula_responsable_segdis + ' ';
        }
      }
    })
    this.tabTable3.table.data.forEach(data => {
      if (data.cedula_responsable_seges) {
        if (!this._utilService.validateIdentityDocument(1, data.cedula_responsable_segdis)) {
          valido_es++;
          cedula_dis += data.cedula_responsable_seges + ' ';
        }
      }
    })

    if (valido_dis > 0 || valido_es > 0) {
      this._utilService.addWarningMessage('Cédula/s no válida/s: <strong>' + cedula_dis + '</strong>');
    }

    if (await this.tabTable2.isSave()) {
      if (await this.tabTable3.isSave()) {
        resultado = this._utilService.encontrarDuplicados(this.tabTable2.table.data, 'nro_distrito');
        if (resultado.length > 0) {
          this._utilService.addMessageInfo(`Los distritos con código  <p class="text-indigo-900	font-semibold"> ${String(resultado)} </p> ya se encuentran registrados.`);
          return;
        }
        resultado = this._utilService.encontrarDuplicados(this.tabTable3.table.data, 'unicodigo_seges');
        if (resultado.length > 0) {
          this._utilService.addMessageInfo(`Los establecimientos con código  <p class="text-indigo-900	font-semibold"> ${String(resultado)} </p> ya se encuentran registrados.`);
          return;
        }
        await this._utilService.saveScreen(this.tabTable2, this.tabTable3);
      }
    }



  }

  delete(): void {
    if (this.tabTable2.isFocus()) {
      this.tabTable2.delete();
    } else if (this.tabTable3.isFocus()) {
      this.tabTable3.delete();
    }
  }


  async getCanton() {
    this.tabTable3.getColumn('ide_thciu').setDropdownService('talento-humano/getCiudades/' + this.tabTable2.getValue('ide_thprov'));
    this.tabTable3.updateDropdown('ide_thciu');

  }



}
