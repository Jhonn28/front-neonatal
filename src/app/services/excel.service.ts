import { Injectable } from '@angular/core';
import { WorkBook } from 'xlsx';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { UtilsService } from '../../../projects/libreria/src/public-api';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private _workbook!: Workbook;

  constructor(
    private _utilService: UtilsService
  ) { }

  async downloadExcel(dataExcel: any) {
    this._utilService.showSpinner();
    this._workbook = new Workbook();
    this._workbook.creator = 'cz3';
    //console.log('DATA =>', dataExcel);
    await this.encabezado(dataExcel.cabecera);
    await this.createTalentoHumano(dataExcel);
    await this.createEspacios(dataExcel.espacios);
    await this.createInsumos(dataExcel.insumos);
    await this.createDocumentacion(dataExcel.documentacion);
    await this.createIncidencia(dataExcel.incidencia);
    await this.createCriterioIE(dataExcel.criterio_inclusion_exclusion);
    await this.createDisponibilidadHC(dataExcel.disponibilidad_hc)
    await this.createCalidadHC(dataExcel.calidad_hc)
    await this.createDispoFarm(dataExcel.medicamentos_disponibilidad)
    await this.createRecetario(dataExcel.recetario)
    await this.createNudoCritico(dataExcel.nudos_criticos)
    await this.createActividadesEquipoTecnico(dataExcel.actividades_asistencia)
    await this.createResolProm(dataExcel.resolucion_problemas)
    await this.createPlanAnual(dataExcel.plan_capacitacion_anual)
    await this.createReferencia(dataExcel.referencia_contrareferencia)
    await this.createProcesoAdministrativo(dataExcel.proceso_administrativo)
    await this.createEvaluacion(dataExcel.evaluacion_general)
    await this.createAcuerdos(dataExcel.acuerdos_compromisos)
    await this.createObservacion(dataExcel.observaciones_generales)
    await this.createResponsabilidades(dataExcel.responsables)

    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      this._utilService.hideSpinner();
      fs.saveAs(blob, `reporte${this._utilService.getDateCurrent()}.xlsx`);
    })
  }

  private encabezado(dataEncabezado: any) {

    const sheet = this._workbook.addWorksheet('encabezado');

    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 15;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 25;
    sheet.getColumn('E').width = 15;
    sheet.getColumn('F').width = 40;
    sheet.getColumn('G').width = 15;
    sheet.getColumn('H').width = 30;
    sheet.getColumn('I').width = 25;
    sheet.getColumn('J').width = 25;
    sheet.getColumn('K').width = 25;
    sheet.getColumn('L').width = 25;
    sheet.getColumn('M').width = 35;
    sheet.getColumn('N').width = 35;
    sheet.getColumn('O').width = 35;
    sheet.getColumn('P').width = 35;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('H').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('I').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('J').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('K').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('L').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('M').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('N').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('O').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'fecha',
      'nro_distrito',
      'distrito',
      'unicodigo',
      'nombre_establecimiento',
      'puntaje',
      'tipo_establecimiento',
      'provincia',
      'ciudad',
      'total_personal',
      'nro_recetas_distrito',
      'responsable_establecimiento',
      'responsable_distrito',
      'responsable_zona',
      'responsable_central'
    ];
    headerRow.font = { bold: true, size: 12 }
    let row_xlsx = 2;
    dataEncabezado.forEach(cabecera => {
      const rowsToInsert = sheet.getRows(row_xlsx, dataEncabezado.length)!;
      cabecera.forEach(data => {
        const row = rowsToInsert[0];
        row.values = [
          data.ide_thcab,
          this._utilService.getDateFormat(data.fecha_thcab, 'yyyy/MM/dd'),
          data.nro_distrito,
          data.nombre_segdis,
          data.unicodigo_seges,
          data.nombre_establecimiento_thcab,
          data.puntaje_thcab,
          data.tipo_establecimiento_thcab,
          data.provincia_thcab,
          data.ciudad_thcab,
          data.total_talento_humano_thcab,
          data.recetario_distrito_thcab,
          data.responsable_establecimiento_thcab,
          data.responsable_distrito_thcab,
          data.responsable_zona_thcab,
          data.responsable_central_thcab,
        ]
        row_xlsx++;
      });
    });
  }

  private createTalentoHumano(dataTH: any) {
    const sheet = this._workbook.addWorksheet('talento_humano');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 42;
    sheet.getColumn('C').width = 38;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 20;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 }
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'talento_humano',
      'nro_capacitados',
      'capacitado',
      'observacion'
    ];

    headerRow.font = { bold: true, size: 12 }

    let row_xlsx = 2;
    dataTH.talento_humano.forEach(talento_humano => {
      const rowsToInsert = sheet.getRows(row_xlsx, talento_humano.length)!;
      let index = 0;
      talento_humano.forEach(data => {
        const row = rowsToInsert[index];
        row.values = [
          data.ide_thcab,
          data.detalle_thpro,
          data.numero_thcapro,
          data.capacitado,
          data.observacion_thcapro
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createEspacios(dataEspacios: any) {
    const sheet = this._workbook.addWorksheet('espacios');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 10;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 30;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 }
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'locales',
      'numero',
      'tiempo_parcial',
      'tiempo_completo',
      'observaciones'
    ];
    let row_xlsx = 2;
    dataEspacios.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(espacio => {
        const row = rowsToInsert[index];
        row.values = [
          espacio.ide_thcab,
          espacio.detalle_gthesp,
          espacio.numero_thcesp,
          espacio.tiempo_completo,
          espacio.tiempo_parcial,
          espacio.observacion_thcesp
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createInsumos(data: any) {
    const sheet = this._workbook.addWorksheet('insumos');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 30;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 }
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'materiales',
      'disponibilidad',
      'estado',
      'observacion',
    ];

    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_thmat,
          value.disponibilidad,
          value.estado,
          value.observacion_thcmat,
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createDocumentacion(data: any) {
    const sheet = this._workbook.addWorksheet('documentacion');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 100;
    sheet.getColumn('C').width = 10;
    sheet.getColumn('D').width = 40;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 }
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'documento',
      'si/no',
      'observaciones'
    ];


    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_thtipdoc,
          value.activo,
          value.observacion_thdoc
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createIncidencia(data: any) {
    const sheet = this._workbook.addWorksheet('incidencia');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 10;
    sheet.getColumn('D').width = 10;
    sheet.getColumn('E').width = 10;
    sheet.getColumn('F').width = 10;
    sheet.getColumn('G').width = 10;
    sheet.getColumn('H').width = 10;
    sheet.getColumn('I').width = 10;
    sheet.getColumn('J').width = 10;
    sheet.getColumn('K').width = 15;
    sheet.getColumn('L').width = 10;
    sheet.getColumn('M').width = 15;
    sheet.getColumn('N').width = 15;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('H').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('I').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('J').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('K').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('L').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('M').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('N').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 }
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'diagnosticos',
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_incdiag,
          value.casos_enero,
          value.casos_febrero,
          value.casos_marzo,
          value.casos_abril,
          value.casos_mayo,
          value.casos_junio,
          value.casos_julio,
          value.casos_agosto,
          value.casos_septiembre,
          value.casos_octubre,
          value.casos_noviembre,
          value.casos_diciembre,
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createCriterioIE(data: any) {
    const sheet = this._workbook.addWorksheet('criterio_inclusion_exclusion');
    sheet.getColumn('A').width = 20;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 10;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 10;
    sheet.getColumn('G').width = 40;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

    headerRow.values = [
      'ide_cabecera',
      'total_pacientes_atendidos',
      'criterios_inclusion',
      '%',
      'criterios_exclusion',
      '%',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.total_pacientes_atendido_thcri,
          value.criterio_inclusion_thcri,
          value.porcentaje_inclusion_thcri,
          value.criterios_exclusion_thcri,
          value.porcentaje_exclusion_thcri,
          value.observacion_thcri
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createDisponibilidadHC(data: any) {
    const sheet = this._workbook.addWorksheet('disponibilidad_hc');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 40;



    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'aspectos',
      'consulta_externa',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_hcasp,
          value.consulta_externa_hcdisp,
          value.observacion_hcdisp
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createCalidadHC(data: any) {
    const sheet = this._workbook.addWorksheet('calidad_hc');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 70;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 40;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'parametros',
      'estado',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_hcpar,
          value.puntuacion,
          value.observacion_hccal
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createDispoFarm(data: any) {
    const sheet = this._workbook.addWorksheet('medicamentos_disponibilidad');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 30;
    sheet.getColumn('D').width = 40;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 20;
    sheet.getColumn('G').width = 25;
    sheet.getColumn('H').width = 20;
    sheet.getColumn('I').width = 20;
    sheet.getColumn('J').width = 20;

    //alineamiento celdas
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('H').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('I').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('J').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'area',
      'medicamento',
      'forma_farmaceutica',
      'disponible',
      'no_disponible',
      'fecha_prox_caducidad',
      'nivel_uno',
      'nivel_dos',
      'nivel_tres'
    ];

    let row_xlsx = 2;
    let fecha;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        if(value.fecha_caducidad_farmdis!=null){
          fecha =  this._utilService.getFormatDate(value.fecha_caducidad_farmdis, 'yyyy/MM/dd');
        }else{
          fecha =value.fecha_caducidad_farmdis;
        }
        row.values = [
          value.ide_thcab,
          value.detalle_thare,
          value.detalle_farm,
          value.detalle_formfar,
          value.cantidad_farmdis,
          value.disponible,
          fecha,
          value.nivel_uno,
          value.nivel_dos,
          value.nivel_tres
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createRecetario(data: any) {
    const sheet = this._workbook.addWorksheet('recetario');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 25;
    sheet.getColumn('D').width = 30;
    sheet.getColumn('E').width = 40;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'medico_responsable',
      'nro_recetas_emitidas',
      'nro_recetas_disponibles_anio',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.empleado,
          value.nro_recetas_emitidas_farmrec,
          value.nro_recetas_disponibles_farmrec,
          value.observacion_farmrec
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createNudoCritico(data: any) {
    const sheet = this._workbook.addWorksheet('nudos_criticos');

    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 35;
    sheet.getColumn('D').width = 35;
    sheet.getColumn('E').width = 35;
    sheet.getColumn('F').width = 35;
    sheet.getColumn('G').width = 35;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'medicamento_no_disponible',
      'causas',
      'acciones',
      'responsable',
      'cargo',
      'fecha_cumplimiento'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.medicamento_no_disponible_farmn,
          value.causas_farmnud,
          value.acciones_farnnud,
          value.responsable_farmnud,
          value.cargo_farmnud,
          this._utilService.getDateFormat(value.fecha_cumplimiento_farmnud, 'yyyy/MM/dd'),
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createActividadesEquipoTecnico(data: any) {
    const sheet = this._workbook.addWorksheet('actividades_equipo_apoyo');

    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 40;
    sheet.getColumn('D').width = 25;
    sheet.getColumn('E').width = 35;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'especialidad',
      'actividades',
      'calificacion',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_thesp,
          value.detalle_act,
          value.calificacion,
          value.observacion_thactis
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createResolProm(data: any) {
    const sheet = this._workbook.addWorksheet('resolucion_problemas');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 15;
    sheet.getColumn('C').width = 35;
    sheet.getColumn('D').width = 35;
    sheet.getColumn('E').width = 35;
    sheet.getColumn('F').width = 20;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'fecha',
      'equipo_supervisor',
      'actividades_fortalecimiento',
      'nudos_detectados',
      'resultados'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          this._utilService.getDateFormat(value.fecha_sprp, 'yyyy/MM/dd'),
          value.equipo_supervisor_sprp,
          value.actividad_fortalecimiento_sprp,
          value.nudo_critico_detectado_sprp,
          value.resultado
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createPlanAnual(data: any) {
    const sheet = this._workbook.addWorksheet('plan_capacitacion_anual');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 25;
    sheet.getColumn('C').width = 22;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 10;
    sheet.getColumn('F').width = 20;
    sheet.getColumn('G').width = 20;
    sheet.getColumn('H').width = 20;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('H').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'temas',
      'total_prof_capacitar',
      'nro_capacitados',
      '%',
      'total_horas',
      'fecha',
      'cronograma_actualizado',
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.tema_sppca,
          value.total_profesional_capacitar_spp,
          value.nro_capacitado_sppca,
          value.porcentaje_sppca,
          value.total_horas_sppca,
          this._utilService.getDateFormat(value.fecha_sppca, 'yyyy/MM/dd'),
          value.actualizado,
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createReferencia(data: any) {
    const sheet = this._workbook.addWorksheet('referencia_contrareferencia');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 25;
    sheet.getColumn('C').width = 15;
    sheet.getColumn('D').width = 15;
    sheet.getColumn('E').width = 30;
    sheet.getColumn('F').width = 30;
    sheet.getColumn('G').width = 30;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'procesos',
      'total',
      'justificado',
      'establecimiento_partida',
      'establecimiento_llegada',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_sppro,
          value.total_sprc,
          value.justificado,
          value.establecimiento_de_sprc,
          value.establecimiento_a_sprc,
          value.observacion_sprc
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createProcesoAdministrativo(data: any) {
    const sheet = this._workbook.addWorksheet('proceso_administrativo');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 15;
    sheet.getColumn('D').width = 15;
    sheet.getColumn('E').width = 15;
    sheet.getColumn('F').width = 15;
    sheet.getColumn('G').width = 40;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('G').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'aspectos',
      '0',
      '1-3',
      '4-6',
      '7+',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_supa,
          value.cero_suppa,
          value.uno_tres_suppa,
          value.cuatro_seis_suppa,
          value.siete_mas_suppa,
          value.observacion_suppa
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createEvaluacion(data: any) {
    const sheet = this._workbook.addWorksheet('evaluacion_general');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 30;
    sheet.getColumn('D').width = 10;
    sheet.getColumn('E').width = 10;
    sheet.getColumn('F').width = 40;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'parametros',
      'indicadores',
      'valor',
      'puntaje',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.detalle_evpar,
          value.detalle_evin,
          value.valor,
          value.puntaje_evagen,
          value.observacion_evagen
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createAcuerdos(data: any) {
    const sheet = this._workbook.addWorksheet('acuerdo_compromiso');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 30;
    sheet.getColumn('C').width = 40;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 35;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'acuerdos y compromisos',
      'responsable',
      'cargo',
      'fecha_cumplimiento'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.acuerdo_acucomp,
          value.responsable_acucomp,
          value.cargo_acucomp,
          this._utilService.getDateFormat(value.fecha_acucomp, 'yyyy/MM/dd')
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createObservacion(data: any) {
    const sheet = this._workbook.addWorksheet('observaciones_generales');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 50;


    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'observaciones'
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.observacion_evab,
        ]
        index++;
        row_xlsx++;
      });
    });

  }

  private createResponsabilidades(data: any) {
    const sheet = this._workbook.addWorksheet('equipo_supervisor');
    sheet.getColumn('A').width = 15;
    sheet.getColumn('B').width = 45;
    sheet.getColumn('C').width = 25;
    sheet.getColumn('D').width = 40;

    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
    sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }


    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    headerRow.values = [
      'ide_cabecera',
      'nombres_apellidos',
      'cargo',
      'observaciones',
    ];
    let row_xlsx = 2;
    data.forEach(element => {
      let index = 0;
      const rowsToInsert = sheet.getRows(row_xlsx, element.length)!;
      element.forEach(value => {
        //console.log(value);
        const row = rowsToInsert[index];
        row.values = [
          value.ide_thcab,
          value.responsable,
          value.cargo,
          value.observacion,
        ]
        index++;
        row_xlsx++;
      });
    });

  }




}
