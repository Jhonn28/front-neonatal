import { Injectable } from '@angular/core';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { UtilsService } from '../../../projects/libreria/src/public-api';
import { IndicadorService } from './indicador.service';
import { upperCase } from 'lodash';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private _workbook!: Workbook;

  estandar = [
    '1',
    '2',
    '3A',
    '3B',
    '4',
    '5',
    '6',
    '7A',
    '7B',
    '8A',
    '8B',
    '8C',
    '8D',
    '8E',
    '8F',
    '9A',
    '9B',
    '9C',
    '10',
    '11',
    '12',
    '13'
  ]

  indicador = [
    '% Insumos esenciales atención Materna y RN',
    'Control prenatal atendido según norma',
    '% Partos con partograma graficado y con control',
    '% partos con decisiones frente a desviaciones de curva de partograma',
    '% Partos con Oxitocina (manejo activo del tercer período)',
    '% de post partos con control según la norma',
    '% de RN en los que se realizó actividades de la norma',
    '% partos atendidos por médico/a u obstetriz',
    '7B	% de RN atendidos por médico/a u obstetriz',
    '% de pctes con preeclampsia, eclampsia manejada según la norma',
    '% de Hemorragias Obstétricas manejadas según la norma',
    '% de infecciones obstétricas manejadas según la norma',
    '% Partos Pretermino con Corticoides prenatales',
    '% Partos Pretermino con Nifedipina como Uteroinhibidor',
    '% Embarazadas con Ruptura Prematura de membranas, manejadas de acuerdo a norma',
    '% RN con infección, manejados de acuerdo a la norma',
    '% RN con Trastornos Respiratorios, manejados de acuerdo a la norma',
    '% RN con Prematurez, manejados de acuerdo a la norma',
    'Tasa hospitalaria de letalidad por complicaciones obstétricas directas',
    'Tasa hospitalaria de mortalidad neonatal',
    '% de complicaciones obstétricas atendidas, de las esperadas',
    '% de muertes maternas investigadas',

  ]

  constructor(
    private _utilService: UtilsService,
    private _indicadorService: IndicadorService
  ) { }

  createWorbook() {
    this._utilService.showSpinner();
    this._workbook = new Workbook();
    this._workbook.creator = 'cz3';
  }

  downloadExcel() {
    console.log('emtrp ');
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, `reporte${this._utilService.getDateCurrent()}.xlsx`);
    })


  }



  async reporteDistrito(anio: string): Promise<Boolean> {
    //TODO: COLORES 

    this.createWorbook();

    try {
      const data = await this._indicadorService.getReporteDistrito(this._utilService.getEmpresa(), anio);
      if (data.length === 0) {
        this._utilService.hideSpinner();
        this._utilService.addMessageInfo('No se encuentran registros en el año de búsqueda.');
        return false;
      }
      if (data.length < 22) {
        this._utilService.hideSpinner();
        this._utilService.addMessageInfo('Llene todos los indicadores y vuelta a intentar.');
        return false;
      }
      const celeste = '33F9FF';
      const verde_claro = 'C6FF33';
      const cafe = 'A3B76E';
      const naranja = 'F6A500';
      const gris = 'AFAFAF'
      const verde_sub = 'B1F178';
      const amarillo_sub = 'F8FA8F';

      const sheet = this._workbook.addWorksheet('talento_humano');

      this.setAligmentRange(sheet, 1, 26);//centramos todas las filas
      //TODO: Fila 1 titulos
      sheet.mergeCells('A1:C2');
      sheet.mergeCells('D1:O2');
      sheet.mergeCells('P1:Q3');
      sheet.mergeCells('R1:R2');


      sheet.getCell('A1:C2').value = 'ZONA 3'
      sheet.getCell('D1:O2').value = 'PROMEDIO DE PORCENTAJE DE CUMPLIMIENTO TRIMESTRAL'
      sheet.getCell('P1:Q3').value = 'CONSOLIDADO GENERAL DE NUMERADORES Y DENOMINADORES'
      sheet.getCell('R1:R2').value = 'PROM. DE % CUMPLIMIENTO ANUAL '

      this.setCellColor(sheet, 'A1,C3', verde_claro);
      this.setCellColor(sheet, 'D1,O2', celeste);
      this.setCellColor(sheet, 'P1,Q26', cafe); //colorea toda la columna hasta q26

      this.setColorRange(sheet, 'P', 4, 26, cafe);
      this.setColorRange(sheet, 'Q', 4, 26, cafe);
      this.setCellColor(sheet, 'R1,R2', naranja);


      //TODO: fila 2 subtitulos
      sheet.mergeCells('A3:A4');
      sheet.mergeCells('B3:B4');
      sheet.mergeCells('C3:C4');
      sheet.getCell('A3:A4').value = 'Proceso';
      sheet.getCell('B3:B4').value = 'Estandar #';
      sheet.getCell('C3:C4').value = 'Indicador';


      this.setCellColor(sheet, 'A3:A4', gris);
      this.setCellColor(sheet, 'B3:B4', gris);
      this.setCellColor(sheet, 'C3:C4', gris);
      this.setCellColor(sheet, 'C3:C4', gris);


      sheet.mergeCells('D3:F3');
      sheet.mergeCells('G3:I3');
      sheet.mergeCells('J3:L3');
      sheet.mergeCells('M3:O3');
      sheet.getCell('D3:F3').value = 'PRIMER TRIMESTRE ENERO-MARZO';
      sheet.getCell('G3:I3').value = 'SEGUNDO TRIMESTRE ABRIL-JUNIO';
      sheet.getCell('J3:L3').value = 'TERCER SEMESTRE JULIO-SEPTIEMBRE';
      sheet.getCell('M3:O3').value = 'CUARTO SEMESTRE OCTUBRE-DICIEMBRE';


      //TODO: n d %
      sheet.getCell('D4').value = 'N';
      sheet.getCell('E4').value = 'D';
      sheet.getCell('F4').value = '%';
      sheet.getCell('G4').value = 'N';
      sheet.getCell('H4').value = 'D';
      sheet.getCell('I4').value = '%';
      sheet.getCell('J4').value = 'N';
      sheet.getCell('K4').value = 'D';
      sheet.getCell('L4').value = '%';
      sheet.getCell('M4').value = 'N';
      sheet.getCell('N4').value = 'D';
      sheet.getCell('O4').value = '%';

      this.setCellColor(sheet, 'D4', amarillo_sub);
      this.setCellColor(sheet, 'E4', verde_sub);
      this.setCellColor(sheet, 'F4', verde_sub);
      this.setCellColor(sheet, 'G4', amarillo_sub);
      this.setCellColor(sheet, 'H4', verde_sub);
      this.setCellColor(sheet, 'I4', verde_sub);
      this.setCellColor(sheet, 'J4', amarillo_sub);
      this.setCellColor(sheet, 'K4', verde_sub);
      this.setCellColor(sheet, 'L4', verde_sub);
      this.setCellColor(sheet, 'M4', amarillo_sub);
      this.setCellColor(sheet, 'N4', verde_sub);
      this.setCellColor(sheet, 'O4', verde_sub);


      this.setBoldRow(sheet, 1);
      this.setBoldRow(sheet, 2);
      this.setBoldRow(sheet, 3);
      this.setBoldRow(sheet, 4);


      //TODO: NUMERADOR Y DENOMINADOR
      sheet.getCell('P4').value = 'Numerador';
      sheet.getCell('Q4').value = 'Denominador';

      //TODO: %anual  enero-diciembre
      sheet.mergeCells('R3:R4');
      sheet.getCell('R3:R4').value = 'ENERO-DICIEMBRE';

      //TODO: Titulos de las columnas 
      this.setColorRange(sheet, 'A', 5, 26, celeste); //set color celeste en toda la columna a 

      this.setMergeValue(sheet, 'A5', 'Estandar de la entrada para AM y RM');
      this.setMergeValue(sheet, 'A6', 'C.P.', true);
      this.setMergeValue(sheet, 'A7:A9', 'Atención del parto', true);
      this.setMergeValue(sheet, 'A10', 'P.P', true);
      this.setMergeValue(sheet, 'A11', 'R.N', true);
      this.setMergeValue(sheet, 'A12:A13', 'Atención profesional', true);
      this.setMergeValue(sheet, 'A14:A19', 'Complicaciones obstétricas', true);
      this.setMergeValue(sheet, 'A20:A22', 'Complicaciones neonatales', true);
      this.setMergeValue(sheet, 'A23:A26', 'Estándares e indicadores de salída', true);


      this.setValueArray(sheet, 'B', this.estandar, 5);
      this.setValueArray(sheet, 'C', this.indicador, 5);
      console.log(data);

      this.estandar.forEach((indicador, row) => {
        //console.log('datos=>',data);
        //console.log('indicador=>', indicador)
        //const index = data.findIndex(data => data.indicador === indicador.toLowerCase());
        const dato = data.find(data => data.indicador === indicador.toLowerCase());
        //console.log(row,dato);
        this.setData(sheet, dato, row + 5);


      });
      this._utilService.hideSpinner();
    this._utilService.toast_success('Puede descargar el reporte en el botón "Exportar .xlsx".', 'Reporte generado.');
      //this._utilService.addMessageSuccess('Puede descargar el reporte en el botón "exportar .xlsx".','Reporte generado.');
      //this._utilService.confirmationAlert('Si desea guardar el archivo, click en descargar. ',()=>{this.downloadExcel()},'Descargar','Excel generado')
     // this._utilService.addLoadingMessage('excel generado','success',()=>this.downloadExcel(),'Descargar');
      return true;
    } catch (e) {
      console.log('e=>', e);
      this._utilService.hideSpinner();
      this._utilService.addWarningMessage('Ocurrió un error al generar el excel. Inténtelo mas tarde.');
      return false;
    }



  }

  async reporteDistritoTrimestral(anio: string,trimestre: number): Promise<Boolean> {

    

    this.createWorbook();

    try {
      const data = await this._indicadorService.getReporteDistritoTrimestral(this._utilService.getEmpresa(), anio,trimestre);
      if (data.length === 0) {
        this._utilService.hideSpinner();
        this._utilService.addMessageInfo('No se encuentran registros en el año de búsqueda.');
        return false;
      }
      if (data.length < 22) {
        this._utilService.hideSpinner();
        this._utilService.addMessageInfo('Llene todos los indicadores y vuelta a intentar.');
        return false;
      }

      console.log(data);

      const celeste = '33F9FF';
      const verde_claro = 'C6FF33';
      const gris = 'AFAFAF'
      const verde_sub = 'B1F178';
      const amarillo_sub = 'F8FA8F';

      const sheet = this._workbook.addWorksheet('REPORTE TRIMESTRAL');

      this.setAligmentRange(sheet, 1, 26);//centramos todas las filas
      //TODO: Fila 1 titulos
      sheet.mergeCells('A1:C2');
      sheet.mergeCells('D1:F2');


      sheet.getCell('A1:C2').value = 'ZONA 3'
      sheet.getCell('D1:F2').value = 'PROMEDIO DE PORCENTAJE DE CUMPLIMIENTO TRIMESTRAL'

      this.setCellColor(sheet, 'A1,C3', verde_claro);
      this.setCellColor(sheet, 'D1,F2', celeste);
    


      //TODO: fila 2 subtitulos
      sheet.mergeCells('A3:A4');
      sheet.mergeCells('B3:B4');
      sheet.mergeCells('C3:C4');
      sheet.getCell('A3:A4').value = 'Proceso';
      sheet.getCell('B3:B4').value = 'Estandar #';
      sheet.getCell('C3:C4').value = 'Indicador';


      this.setCellColor(sheet, 'A3:A4', gris);
      this.setCellColor(sheet, 'B3:B4', gris);
      this.setCellColor(sheet, 'C3:C4', gris);
      this.setCellColor(sheet, 'C3:C4', gris);


      sheet.mergeCells('D3:F3');
      (trimestre==1)? sheet.getCell('D3:F3').value = 'PRIMER TRIMESTRE ENERO-MARZO':0; 
      (trimestre==2)? sheet.getCell('D3:F3').value = 'SEGUNDO TRIMESTRE ABRIL-JUNIO':0;
      (trimestre==3)? sheet.getCell('D3:F3').value = 'TERCER SEMESTRE JULIO-SEPTIEMBRE':0; 
      (trimestre==4)? sheet.getCell('D3:F3').value = 'CUARTO SEMESTRE OCTUBRE-DICIEMBRE':0; 


      //TODO: n d %
      sheet.getCell('D4').value = 'N';
      sheet.getCell('E4').value = 'D';
      sheet.getCell('F4').value = '%';

      
      this.setCellColor(sheet, 'D4', amarillo_sub);
      this.setCellColor(sheet, 'E4', verde_sub);
      this.setCellColor(sheet, 'F4', verde_sub);



      this.setBoldRow(sheet, 1);
      this.setBoldRow(sheet, 2);
      this.setBoldRow(sheet, 3);
      this.setBoldRow(sheet, 4);



      //TODO: Titulos de las columnas 
      this.setColorRange(sheet, 'A', 5, 26, celeste); //set color celeste en toda la columna a 

      this.setMergeValue(sheet, 'A5', 'Estandar de la entrada para AM y RM');
      this.setMergeValue(sheet, 'A6', 'C.P.', true);
      this.setMergeValue(sheet, 'A7:A9', 'Atención del parto', true);
      this.setMergeValue(sheet, 'A10', 'P.P', true);
      this.setMergeValue(sheet, 'A11', 'R.N', true);
      this.setMergeValue(sheet, 'A12:A13', 'Atención profesional', true);
      this.setMergeValue(sheet, 'A14:A19', 'Complicaciones obstétricas', true);
      this.setMergeValue(sheet, 'A20:A22', 'Complicaciones neonatales', true);
      this.setMergeValue(sheet, 'A23:A26', 'Estándares e indicadores de salída', true);


      this.setValueArray(sheet, 'B', this.estandar, 5);
      this.setValueArray(sheet, 'C', this.indicador, 5);

      this.estandar.forEach((indicador, row) => {
        //console.log('datos=>',data);
        //console.log('indicador=>', indicador)
        //const index = data.findIndex(data => data.indicador === indicador.toLowerCase());
        const dato = data.find(data => data.indicador === indicador.toLowerCase());
        //console.log(row,dato);
        this.setDataTrimestral(sheet, dato, row + 5);
        
        
      });
      //this.downloadExcel();
      this._utilService.hideSpinner();
    this._utilService.toast_success('Puede descargar el reporte en el botón "Exportar .xlsx".', 'Reporte generado.');
      //this._utilService.addMessageSuccess('Puede descargar el reporte en el botón "exportar .xlsx".','Reporte generado.');
      //this._utilService.confirmationAlert('Si desea guardar el archivo, click en descargar. ',()=>{this.downloadExcel()},'Descargar','Excel generado')
     // this._utilService.addLoadingMessage('excel generado','success',()=>this.downloadExcel(),'Descargar');
      return true;
    } catch (e) {
      console.log('e=>', e);
      this._utilService.hideSpinner();
      this._utilService.addWarningMessage('Ocurrió un error al generar el excel. Inténtelo mas tarde.');
      return false;
    }



  }




  //TODO: color de celda
  setCellColor(sheet, cell, color) {
    sheet.getCell(cell).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
  }

  setAligmentRange(sheet, inicio, fin) {
    for (let index = inicio; index <= fin; index++) {
      sheet.getRow(index).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    }
  }

  setBoldRow(sheet, row: number) {
    sheet.getRow(row).font = { bold: true }
  }

  setMergeValue(sheet, cell, value, aligment?: boolean) {
    sheet.mergeCells(cell);
    sheet.getCell(cell).value = value;
    if (aligment) {
      sheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true, textRotation: 90 }


    }
  }

  setColorRange(sheet, cell, inicio, fin, color) {
    for (let index = inicio; index <= fin; index++) {
      sheet.getCell(cell + index).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };

    }
  }

  setValueArray(sheet, cell, array, inicio) {
    array.forEach(element => {
      sheet.getCell(cell + inicio).value = element;
      inicio++;
    });
  }

  /**
   * @param sheet hoja de excel
   * @param data datos del indicador, numerador, denominador, etc
   * @param index posicion donde se encuentra el indicador dentro del array
   * @param row indice dentro de array + 5 debido a la posicion en el excel 
   */
  setData(sheet, data, row) {
    let porcentaje = 0;
    const verde = '27AE60';
    const amarillo = 'F4D03F';
    const rojo = 'EA3737';
    /*     console.log(Number(data.denominador_trimestre_1)!=0,Number(data.numerador_trimestre_1),Number(data.denominador_trimestre_1),Number(data.denominador_trimestre_1)*100);
        console.log('data=>',data);
        console.log('D'+row); */
    sheet.getCell('D' + row).value = data.numerador_trimestre_1;
    sheet.getCell('E' + row).value = data.denominador_trimestre_1;
    (Number(data.denominador_trimestre_1) != 0) ? porcentaje = (Number(data.numerador_trimestre_1) * 100) / Number(data.denominador_trimestre_1) : porcentaje = 0;
    sheet.getCell('F' + row).value = Number(porcentaje).toFixed(2);

    //TODO: color 1-9
    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {
      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'F' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'F' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'F' + row, rojo) : 0;
    }
    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;

    sheet.getCell('G' + row).value = data.numerador_trimestre_2;
    sheet.getCell('H' + row).value = data.denominador_trimestre_2;
    (Number(data.denominador_trimestre_2) != 0) ? porcentaje = (Number(data.numerador_trimestre_2) * 100) / Number(data.denominador_trimestre_2) : porcentaje = 0;
    sheet.getCell('I' + row).value = Number(porcentaje).toFixed(2);

    //TODO: color 1-9
    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {
      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'I' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'I' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'I' + row, rojo) : 0;
    }

    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'I' + row, rojo) : this.setCellColor(sheet, 'I' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'I' + row, rojo) : this.setCellColor(sheet, 'I' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'I' + row, rojo) : this.setCellColor(sheet, 'I' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'I' + row, rojo) : this.setCellColor(sheet, 'I' + row, verde) : 0;

    sheet.getCell('J' + row).value = data.numerador_trimestre_3;
    sheet.getCell('K' + row).value = data.denominador_trimestre_3;
    (Number(data.denominador_trimestre_3) != 0) ? porcentaje = (Number(data.numerador_trimestre_3) * 100) / Number(data.denominador_trimestre_3) : porcentaje = 0;
    sheet.getCell('L' + row).value = Number(porcentaje).toFixed(2);

    //TODO: color 1-9
    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {

      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'L' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'L' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'L' + row, rojo) : 0;
    }

    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'L' + row, rojo) : this.setCellColor(sheet, 'L' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'L' + row, rojo) : this.setCellColor(sheet, 'L' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'L' + row, rojo) : this.setCellColor(sheet, 'L' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'L' + row, rojo) : this.setCellColor(sheet, 'L' + row, verde) : 0;

    sheet.getCell('M' + row).value = data.numerador_trimestre_4;
    sheet.getCell('N' + row).value = data.denominador_trimestre_4;
    (Number(data.denominador_trimestre_4) != 0) ? porcentaje = (Number(data.numerador_trimestre_4) * 100) / Number(data.denominador_trimestre_4) : porcentaje = 0;
    sheet.getCell('O' + row).value = Number(porcentaje).toFixed(2);

    //TODO: color 1-9
    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {
      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'O' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'O' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'O' + row, rojo) : 0;
    }
    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'O' + row, rojo) : this.setCellColor(sheet, 'O' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'O' + row, rojo) : this.setCellColor(sheet, 'O' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'O' + row, rojo) : this.setCellColor(sheet, 'O' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'O' + row, rojo) : this.setCellColor(sheet, 'O' + row, verde) : 0;
    let numerador_anual = Number(data.numerador_trimestre_1) + Number(data.numerador_trimestre_2) + Number(data.numerador_trimestre_3) + Number(data.numerador_trimestre_4);
    let denominador_anual = Number(data.denominador_trimestre_1) + Number(data.denominador_trimestre_2) + Number(data.denominador_trimestre_3) + Number(data.denominador_trimestre_4);
    let porcentaje_anual = 0;
    (denominador_anual != 0) ? porcentaje_anual = (numerador_anual * 100) / denominador_anual : porcentaje_anual = 0;

    sheet.getCell('P' + row).value = numerador_anual;
    sheet.getCell('Q' + row).value = denominador_anual;
    sheet.getCell('R' + row).value = Number(porcentaje_anual).toFixed(2);

    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {
      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'R' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'R' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'R' + row, rojo) : 0;
    }
    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'R' + row, rojo) : this.setCellColor(sheet, 'R' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'R' + row, rojo) : this.setCellColor(sheet, 'R' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'R' + row, rojo) : this.setCellColor(sheet, 'R' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'R' + row, rojo) : this.setCellColor(sheet, 'R' + row, verde) : 0;
  }

  setDataTrimestral(sheet, data, row) {
    let porcentaje = 0;
    const verde = '27AE60';
    const amarillo = 'F4D03F';
    const rojo = 'EA3737';
    /*     console.log(Number(data.denominador_trimestre_1)!=0,Number(data.numerador_trimestre_1),Number(data.denominador_trimestre_1),Number(data.denominador_trimestre_1)*100);
        console.log('data=>',data);
        console.log('D'+row); */
    sheet.getCell('D' + row).value = data.numerador;
    sheet.getCell('E' + row).value = data.denominador;
    (Number(data.denominador) != 0) ? porcentaje = (Number(data.numerador) * 100) / Number(data.denominador) : porcentaje = 0;
    sheet.getCell('F' + row).value = Number(porcentaje).toFixed(2);

    //TODO: color 1-9
    if (data.indicador == '1' || data.indicador == '2' || data.indicador == '3a' || data.indicador == '3b' || data.indicador == '4' || data.indicador == '5' || data.indicador == '6' || data.indicador == '7a' || data.indicador == '7b' || data.indicador == '8a' || data.indicador == '8b' || data.indicador == '8c' || data.indicador == '8d' || data.indicador == '8e' || data.indicador == '8f') {
      (porcentaje >= 91 && porcentaje <= 100) ? this.setCellColor(sheet, 'F' + row, verde) : 0;
      (porcentaje >= 71 && porcentaje < 91) ? this.setCellColor(sheet, 'F' + row, amarillo) : 0;
      (porcentaje > 0 && porcentaje < 71) ? this.setCellColor(sheet, 'F' + row, rojo) : 0;
    }
    (data.indicador == '10') ? (porcentaje > 1) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '11') ? (porcentaje > 1) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '12') ? (porcentaje < 71) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;
    (data.indicador == '13') ? (porcentaje < 100) ? this.setCellColor(sheet, 'F' + row, rojo) : this.setCellColor(sheet, 'F' + row, verde) : 0;

  }

  

  async downloadHistorico() {

    try {
      console.log('entro a down');
      this.createWorbook();
      const data = await this._indicadorService.getHistorico();
      const sheet = this._workbook.addWorksheet('historico');
      /*   sheet.getColumn('A').width = 15;
        sheet.getColumn('B').width = 40;
        sheet.getColumn('C').width = 20;
        sheet.getColumn('D').width = 40;
     */


      //alineamiento celdas
      sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      sheet.getColumn('B').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
      sheet.getColumn('C').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      sheet.getColumn('D').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
      sheet.getColumn('E').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
      sheet.getColumn('F').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
      sheet.getColumn('J').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }
      sheet.getColumn('K').alignment = { vertical: 'middle', horizontal: 'justify', wrapText: true }

      sheet.getColumn('A').width = 10;
      sheet.getColumn('B').width = 20;
      sheet.getColumn('C').width = 25;
      sheet.getColumn('D').width = 30;
      sheet.getColumn('E').width = 30;
      sheet.getColumn('F').width = 30;
      sheet.getColumn('G').width = 40;
      sheet.getColumn('H').width = 20;
      sheet.getColumn('I').width = 20;
      sheet.getColumn('K').width = 20;
      const headerRow = sheet.getRow(1);
      headerRow.font = { bold: true, size: 12 };
      headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      
      headerRow.values = [
        'ZONA',
        'PROVINCIA',
        'DISTRITO',
        'ESTABLECIMIENTO DE SALUD',
        'FECHA MEDICION',
        'PERIODO EVALUADO',
        'RESPONSABLE DE LA MEDICIÓN',
        'INDICADOR',
        'NUMERADOR',
        'DENOMINADOR',
        'PORCENTAJE'
      ];
      console.log('paso header=>', data);
      let index = 0;
      data.forEach(element => {
        sheet.addRow([
          element.zona,
          element.provincia,
          element.distrito,
          element.establecimiento,
          element.fecha_medicion,
          element.periodo,
          element.responsable,
          element.indicador,
          element.numerador,
          element.denominador,
          element.porcentaje,
        ]);
        sheet.getRow(index).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
        index++;
      });


      this.downloadExcel();
      this._utilService.hideSpinner();
    } catch (err) {
      this._utilService.hideSpinner();
      return err;
    }
  }
}
