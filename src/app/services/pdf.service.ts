import { Injectable } from '@angular/core';
import { ITable, IText, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { UtilsService } from '../../../projects/libreria/src/lib/services/utils.service';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private _utilService: UtilsService
  ) { }

  createPdf(encabezado: any, detalle: any,calificacion:number) {
    this._utilService.showSpinner();
    //set fonts
    PdfMakeWrapper.setFonts(pdfFonts);

    //loadData
    const talento_humano = detalle.talento_humano;
    const espacios = detalle.espacios;
    const insumos = detalle.insumos;
    const documentacion = detalle.documentacion;
    const incidencia = detalle.incidencia;
    const criterio_inclusion_exclusion = detalle.criterio_inclusion_exclusion;
    const disponibilidad_hc = detalle.disponibilidad_hc;
    const calidad_hc = detalle.calidad_hc;
    const disponibilidad_med = detalle.medicamentos_disponibilidad;
    const recetario = detalle.recetario;
    const nudo_critico = detalle.nudos_criticos;
    const actividades_asistencia = detalle.actividades_asistencia;
    const resolucion_problema = detalle.resolucion_problemas;
    const capacitacion_anual = detalle.plan_capacitacion_anual;
    const referencia_contrareferencia = detalle.referencia_contrareferencia;
    const proceso_administrativo = detalle.proceso_administrativo;
    const evaluacion_general = detalle.evaluacion_general;
    const acuerdo_compromiso = detalle.acuerdos_compromisos;
    const observaciones_generales=detalle.observaciones_generales;
    const responsables=detalle.responsables;
    let backgroud: string;
    let color: string;

    (encabezado.puntaje_thcab<=60)? backgroud='red': 0;
    (encabezado.puntaje_thcab>60 && encabezado.puntaje_thcab<80)? backgroud='yellow': 0;
    (encabezado.puntaje_thcab>=80)? backgroud='green': 0;




    const titulo: IText = new Txt('IDENTIFICACIÓN DEL ESTABLECIMIENTO DE SALUD PÚBLICA').alignment('center').bold().end;

    const res_establecimiento: IText = new Txt([
      new Txt('Responsable de SM del establecimiento: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.responsable_establecimiento_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const res_distrito: IText = new Txt([
      new Txt('Responsable de SM del Distrito: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.responsable_distrito_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const res_zona: IText = new Txt([
      new Txt('Responsable de SM de la Zona: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.responsable_zona_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const res_central: IText = new Txt([
      new Txt('Responsable de SM de Planta Central: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.responsable_central_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const zona: IText = new Txt([
      new Txt('N° Zona: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.nro_zona_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const provincia: IText = new Txt([
      new Txt('Provincia: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.provincia_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const ciudad: IText = new Txt([
      new Txt('Ciudad: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.ciudad_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const nombre: IText = new Txt([
      new Txt('Nombre del Establecimiento:  ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.nombre_establecimiento_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const tipo: IText = new Txt([
      new Txt('Tipo de establecimiento:  ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.tipo_establecimiento_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    const fecha: IText = new Txt([
      new Txt('Fecha: ').alignment('justify').bold().fontSize(10).end,
      new Txt(this._utilService.getFormatDate(encabezado.fecha_thcab, 'yyyy/MM/dd')).alignment('justify').fontSize(10).end,
    ]).end;
    const hora: IText = new Txt([
      new Txt('Hora: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.hora_thcab).alignment('justify').fontSize(10).end,
    ]).end;

    //guia
    const guia: IText = new Txt('Guía de Supervisión a Servicios de Salud Mental para Centros Ambulatorios.').alignment('center').bold().fontSize(10).end;



    //TODO: 1
    const t1: IText = new Txt('1. Recursos').alignment('center').bold().fontSize(10).end;
    const st1: IText = new Txt('1.1 Talento humano').alignment('justify').fontSize(10).end;

    //tabla 1

    const talento_humano_t: ITable = new Table([
      [
        new Txt('Talento humano').bold().alignment('center').end,
        new Txt('Nro').alignment('center').bold().end,
        new Txt('Capacitado').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...talento_humano.map(item => [
        new Txt(item.detalle_thpro).alignment('justify').end,
        new Txt(item.numero_thcapro).alignment('center').end,
        new Txt(item.capacitado).alignment('center').end,
        new Txt(item.observacion_thcapro).alignment('justify').end
      ])
    ]).
      dontBreakRows(true).
      widths([200, 25, 75, 150]).
      fontSize(8).
      end;

    //1.2
    const st2: IText = new Txt('1.2 Espacios').alignment('justify').fontSize(10).end;
    const espacios_t: ITable = new Table([
      [
        new Txt('Locales').bold().alignment('center').end,
        new Txt('Nro').bold().alignment('center').end,
        new Txt('Tiempo completo').alignment('center').bold().end,
        new Txt('Tiempo parcial').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...espacios.map(item => [
        new Txt(item.detalle_gthesp).alignment('justify').end,
        new Txt(item.numero_thcesp).alignment('center').end,
        new Txt(item.tiempo_completo).alignment('center').end,
        new Txt(item.tiempo_parcial).alignment('center').end,
        new Txt(item.observacion_thcesp).alignment('justify').end
      ])
    ]).
      dontBreakRows(false).
      widths([175, 25, 50, 50, 150]).
      fontSize(8).
      end;

    //1.3
    const st3: IText = new Txt('1.3- Insumos para terapia ocupacional, rehabilitación y actividades deportivas').alignment('justify').fontSize(10).end;
    const insumos_t: ITable = new Table([
      [
        new Txt('Materiales').bold().alignment('center').end,
        new Txt('Disponibilidad').bold().alignment('center').end,
        new Txt('Estado').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...insumos.map(item => [
        new Txt(item.detalle_thmat).alignment('justify').end,
        new Txt(item.disponibilidad).alignment('center').end,
        new Txt(item.estado).alignment('center').end,
        new Txt(item.observacion_thcmat).alignment('center').end,
      ])
    ]).
      dontBreakRows(false).
      widths([150, 75, 75, 150]).
      fontSize(8).
      end;
    //1.4
    const st4: IText = new Txt('1.3- Insumos para terapia ocupacional, rehabilitación y actividades deportivas').alignment('justify').fontSize(10).end;
    const documentacion_t: ITable = new Table([
      [
        new Txt('Documento').bold().alignment('center').end,
        new Txt('Si/No').bold().alignment('center').end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...documentacion.map(item => [
        new Txt(item.detalle_thtipdoc).alignment('justify').end,
        new Txt(item.activo).alignment('center').end,
        new Txt(item.observacion_thdoc).alignment('center').end,
      ])
    ]).
      dontBreakRows(false).
      widths([200, 50, 200]).
      fontSize(8).
      end;
    //total talento-humano
    const total_talento_humano: IText = new Txt([
      new Txt('Total: ').alignment('right').fontSize(10).end,
      new Txt(`${encabezado.total_talento_humano_thcab}`).alignment('right').bold().fontSize(10).end,
    ]).end;
    //TODO: 2
    const t2: IText = new Txt('2. Incidencia').alignment('center').bold().fontSize(10).end;
    const incidencia_t: ITable = new Table([
      [
        new Txt('Diagnósticos').bold().alignment('center').end,
        new Txt('Casos enero').bold().alignment('center').end,
        new Txt('Casos febrero').bold().alignment('center').end,
        new Txt('Casos marzo').bold().alignment('center').end,
        new Txt('Casos abril').bold().alignment('center').end,
        new Txt('Casos mayo').bold().alignment('center').end,
        new Txt('Casos junio').bold().alignment('center').end,
        new Txt('Casos julio').bold().alignment('center').end,
        new Txt('Casos agosto').bold().alignment('center').end,
        new Txt('Casos septiembre').bold().alignment('center').end,
        new Txt('Casos octubre').bold().alignment('center').end,
        new Txt('Casos noviembre').bold().alignment('center').end,
        new Txt('Casos diciembre').bold().alignment('center').end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...incidencia.map(item => [
        new Txt(item.detalle_incdiag).alignment('justify').end,
        new Txt(item.casos_enero).alignment('center').end,
        new Txt(item.casos_febrero).alignment('center').end,
        new Txt(item.casos_marzo).alignment('center').end,
        new Txt(item.casos_abril).alignment('center').end,
        new Txt(item.casos_mayo).alignment('center').end,
        new Txt(item.casos_junio).alignment('center').end,
        new Txt(item.casos_julio).alignment('center').end,
        new Txt(item.casos_agosto).alignment('center').end,
        new Txt(item.casos_septiembre).alignment('center').end,
        new Txt(item.casos_octubre).alignment('center').end,
        new Txt(item.casos_noviembre).alignment('center').end,
        new Txt(item.casos_diciembre).alignment('center').end,
      ])
    ]).
      dontBreakRows(false).
      widths([100, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]).
      fontSize(8).
      end;
    //TODO: 3
    const t3: IText = new Txt('3- Criterios de inclusión y exclusión.').alignment('center').bold().fontSize(10).end;
    const criterio_inclusion_exclusion_t: ITable = new Table([
      [
        new Txt('Total pacientes atendidos').bold().alignment('center').end,
        new Txt('Criterios de inclusión').bold().alignment('center').end,
        new Txt('%').bold().alignment('center').end,
        new Txt('Criterios de exclusión').bold().alignment('center').end,
        new Txt('%').bold().alignment('center').end,
        new Txt('Observaciones').bold().alignment('justify').end,
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...criterio_inclusion_exclusion.map(item => [
        new Txt(item.total_pacientes_atendido_thcri).alignment('center').end,
        new Txt(item.criterio_inclusion_thcri).alignment('center').end,
        new Txt(item.porcentaje_inclusion_thcri).alignment('center').end,
        new Txt(item.criterios_exclusion_thcri).alignment('center').end,
        new Txt(item.porcentaje_exclusion_thcri).alignment('center').end,
        new Txt(item.observacion_thcri).alignment('justify').end,
      ])
    ]).
      dontBreakRows(false).
      widths([150, 50, 25, 50, 25, 150]).
      fontSize(8).
      end;
    //TODO: 4
    const t4: IText = new Txt('4- Disponibilidad de la Historia Clínica Única.').alignment('center').bold().fontSize(10).end;
    const disponibilidad_hc_t: ITable = new Table([
      [
        new Txt('Aspectos').bold().alignment('center').end,
        new Txt('Consulta externa').bold().alignment('center').end,
        new Txt('Observaciones').bold().alignment('center').end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...disponibilidad_hc.map(item => [
        new Txt(item.detalle_hcasp).alignment('justify').end,
        new Txt(item.consulta_externa_hcdisp).alignment('center').end,
        new Txt(item.observacion_hcdisp).alignment('justify').end
      ])
    ]).
      dontBreakRows(false).
      widths([175, 100, 175]).
      fontSize(8).
      end;

    //4.1
    const st41: IText = new Txt('4.1- Calidad de la Historia Clínica Única.').alignment('justify').fontSize(10).end;
    const calidad_hc_t: ITable = new Table([
      [
        new Txt('Parámetros').bold().alignment('center').end,
        new Txt('Estado').bold().alignment('center').end,
        new Txt('Observaciones').bold().alignment('center').end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...calidad_hc.map(item => [
        new Txt(item.detalle_hcpar).alignment('justify').end,
        new Txt(item.puntuacion).alignment('center').end,
        new Txt(item.observacion_hccal).alignment('justify').end
      ])
    ]).
      dontBreakRows(false).
      widths([225, 75, 150]).
      fontSize(8).
      end;

      //calificacion
      const calificacion_hc: IText = new Txt([
        new Txt(`${calificacion}%`).alignment('right').bold().fontSize(10).end,
        new Txt('calificado como Bueno').alignment('right').fontSize(10).end,
      ]).end;
    //TODO: 5
    const t5: IText = new Txt('5- Medicamentos').alignment('center').bold().fontSize(10).end;
    const st51: IText = new Txt('5.1- Disponibilidad').alignment('justify').fontSize(10).end;
    const disponibilidad_med_t: ITable = new Table([
      [
        new Txt('Área').bold().alignment('center').end,
        new Txt('Fármaco').bold().alignment('center').end,
        new Txt('Forma farmacéutica').bold().alignment('center').end,
        new Txt('Disponible').bold().alignment('center').end,
        new Txt('No disponible').bold().alignment('center').end,
        new Txt('Caducidad próxima').bold().alignment('center').end,
        new Txt('Nivel I').bold().alignment('center').end,
        new Txt('Nivel II').bold().alignment('center').end,
        new Txt('Nivel III').bold().alignment('center').end,
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...disponibilidad_med.map(item => [
        new Txt(item.detalle_thare).alignment('justify').end,
        new Txt(item.detalle_farm).alignment('justify').end,
        new Txt(item.detalle_formfar).alignment('justify').end,
        new Txt(item.cantidad_farmdis).alignment('center').end,
        new Txt(item.disponible).alignment('center').end,
        new Txt(this._utilService.getFormatDate(item.fecha_caducidad_farmdis, 'yyyy/MM/dd')).alignment('justify').end,
        new Txt(item.nivel_uno).alignment('center').end,
        new Txt(item.nivel_dos).alignment('center').end,
        new Txt(item.nivel_tres).alignment('center').end,
      ])
    ]).
      dontBreakRows(false).
      widths([75, 75, 75, 50, 50, 50, 25, 25, 25]).
      fontSize(8).
      end;
    //5.2
    const st52: IText = new Txt('5.2- Recetarios de estupefacientes y psicotrópicos').alignment('justify').fontSize(10).end;
    const recetario_t: ITable = new Table([
      [
        new Txt('Nombre y apellidos del médico autorizado').bold().alignment('center').end,
        new Txt('No. de recetas emitidas/ año ').bold().alignment('center').end,
        new Txt('No. de recetas disponibles/ año').bold().alignment('center').end,
        new Txt('Observaciones').bold().alignment('center').end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...recetario.map(item => [
        new Txt(item.empleado).alignment('justify').end,
        new Txt(item.nro_recetas_emitidas_farmrec).alignment('center').end,
        new Txt(item.nro_recetas_disponibles_farmrec).alignment('center').end,
        new Txt(item.observacion_farmrec).alignment('justify').end,
      ])
    ]).
      dontBreakRows(false).
      widths([150, 100, 100, 100]).
      fontSize(8).
      end;
    //5.2.1
    const st521: IText = new Txt([
      new Txt('5.2.1- No. de recetarios en el Distrito: ').alignment('justify').bold().fontSize(10).end,
      new Txt(encabezado.recetario_distrito_thcab).alignment('justify').fontSize(10).end,
    ]).end;
    //5.2.2
    const st522: IText = new Txt('5.2.2 Nudos críticos').alignment('justify').fontSize(10).end;
    const nudo_critico_t: ITable = new Table([
      [
        new Txt('Medicamentos no disponibles').bold().alignment('center').end,
        new Txt('Causas').bold().alignment('center').end,
        new Txt('Acciones').bold().alignment('center').end,
        new Txt('Responsable').bold().alignment('center').end,
        new Txt('Cargo').bold().alignment('center').end,
        new Txt('Fecha cumplimiento').bold().alignment('center').end,
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...nudo_critico.map(item => [
        new Txt(item.medicamento_no_disponible_farmn).alignment('justify').end,
        new Txt(item.causas_farmnud).alignment('justify').end,
        new Txt(item.acciones_farnnud).alignment('justify').end,
        new Txt(item.responsable_farmnud).alignment('justify').end,
        new Txt(item.cargo_farmnud).alignment('center').end,
        new Txt(this._utilService.getFormatDate(item.fecha_cumplimiento_farmnud, 'yyyy-MM-dd')).alignment('center').end,
      ])
    ]).
      dontBreakRows(false).
      widths([75, 75, 75, 75, 75, 75]).
      fontSize(8).
      end;
    //TODO: 6
    const t6: IText = new Txt('6- Actividades asistenciales del equipo técnico').alignment('center').bold().fontSize(10).end;
    const actividades_asistencia_t: ITable = new Table([
      [
        new Txt('Especialidad').bold().alignment('center').end,
        new Txt('Actividades').alignment('center').bold().end,
        new Txt('Calificación').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      //[new Cell(new Txt('A').end).colSpan(4).end, null, null, null],
      ...actividades_asistencia.map(item => [
        new Txt(item.detalle_thesp).alignment('justify').end,
        new Txt(item.detalle_act).alignment('justify').end,
        new Txt(item.calificacion).alignment('center').end,
        new Txt(item.observacion_thactis).alignment('justify').end
      ])
    ]).
      dontBreakRows(true).
      widths([75,150,75,150]).
      fontSize(8).
      end;
    //TODO: 7
    const t7: IText = new Txt('7- Supervisiones de enlace recibidas.').alignment('center').bold().fontSize(10).end;
    const st71: IText = new Txt('7.1- Resolución de problemas. ').alignment('justify').fontSize(10).end;
    const resolucion_problema_t: ITable = new Table([
      [
        new Txt('Fecha').bold().alignment('center').end,
        new Txt('Equipo supervisor').alignment('center').bold().end,
        new Txt('Actividades de fortalecimiento').alignment('center').bold().end,
        new Txt('Nudos críticos detectados').alignment('center').bold().end,
        new Txt('Resultados').alignment('center').bold().end
      ],
      ...resolucion_problema.map(item => [
        new Txt(this._utilService.getFormatDate(item.fecha_sprp,'yyyy-MM-dd')).alignment('center').end,
        new Txt(item.equipo_supervisor_sprp).alignment('justify').end,
        new Txt(item.actividad_fortalecimiento_sprp).alignment('justify').end,
        new Txt(item.nudo_critico_detectado_sprp).alignment('justify').end,
        new Txt(item.resultado).alignment('justify').end
      ])
    ]).
      dontBreakRows(true).
      widths([50,75,140,135,50]).
      fontSize(8).
      end;
      //7.2
      const st72: IText = new Txt('7.2- Capacitación anual').alignment('justify').fontSize(10).end;
    const capacitacion_anual_t: ITable = new Table([
      [
        new Txt('Tema').bold().alignment('center').end,
        new Txt('Total profesionales a capacitar').alignment('center').bold().end,
        new Txt('Nro. Capacitados').alignment('center').bold().end,
        new Txt('%').alignment('center').bold().end,
        new Txt('Total horas').alignment('center').bold().end,
        new Txt('Fecha').alignment('center').bold().end,
        new Txt('Cronograma actualizado').alignment('center').bold().end
      ],
      ...capacitacion_anual.map(item => [
        new Txt(item.tema_sppca).alignment('justify').end,
        new Txt(item.total_profesional_capacitar_spp).alignment('center').end,
        new Txt(item.nro_capacitado_sppca).alignment('center').end,
        new Txt(item.porcentaje_sppca).alignment('center').end,
        new Txt(item.total_horas_sppca).alignment('center').end,
        new Txt(this._utilService.getFormatDate(item.fecha_sppca,'yyyy-MM-dd')).alignment('justify').end,
        new Txt(item.actualizado).alignment('center').end
      ])
    ]).
      dontBreakRows(true).
      widths([150,70,50,40,40,50,50]).
      fontSize(8).
      end;
      //7.3
      const st73: IText = new Txt('7.3- Referencia – contrareferencia.').alignment('justify').fontSize(10).end;
    const referencia_contrareferencia_t: ITable = new Table([
      [
        new Txt('Procesos').bold().alignment('center').end,
        new Txt('Total').alignment('center').bold().end,
        new Txt('Justificado').alignment('center').bold().end,
        new Txt('Establecimiento de salud ida').alignment('center').bold().end,
        new Txt('Establecimiento de salud destino').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      ...referencia_contrareferencia.map(item => [
        new Txt(item.detalle_sppro).alignment('justify').end,
        new Txt(item.total_sprc).alignment('center').end,
        new Txt(item.justificado).alignment('center').end,
        new Txt(item.establecimiento_de_sprc).alignment('justify').end,
        new Txt(item.establecimiento_a_sprc).alignment('justify').end,
        new Txt(item.observacion_sprc).alignment('justify').end,
      ])
    ]).
      dontBreakRows(true).
      widths([125,25,50,75,75,100]).
      fontSize(8).
      end;
      //7.4
      const st74: IText = new Txt('7.4- Proceso administrativo').alignment('justify').fontSize(10).end;
    const proceso_administrativo_t: ITable = new Table([
      [
        new Txt('Aspectos').bold().alignment('center').end,
        new Txt('0').alignment('center').bold().end,
        new Txt('1-3').alignment('center').bold().end,
        new Txt('4-6').alignment('center').bold().end,
        new Txt('7 +').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      ...proceso_administrativo.map(item => [
        new Txt(item.detalle_supa).alignment('justify').end,
        new Txt(item.cero_suppa).alignment('center').end,
        new Txt(item.uno_tres_suppa).alignment('center').end,
        new Txt(item.cuatro_seis_suppa).alignment('center').end,
        new Txt(item.siete_mas_suppa).alignment('center').end,
        new Txt(item.observacion_suppa).alignment('justify').end,
      ])
    ]).
      dontBreakRows(true).
      widths([150,25,25,25,25,200]).
      fontSize(8).
      end;
    //TODO: 8
    const t8: IText = new Txt('8- Evaluación general').alignment('center').bold().fontSize(10).end;
    const evaluacion_general_t: ITable = new Table([
      [
        new Txt('Parámetros').bold().alignment('center').end,
        new Txt('Indicadores').alignment('center').bold().end,
        new Txt('Valor').alignment('center').bold().end,
        new Txt('Puntaje').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end
      ],
      ...evaluacion_general.map(item => [
        new Txt(item.detalle_evpar).alignment('justify').end,
        new Txt(item.detalle_evin).alignment('justify').end,
        new Txt(item.valor).alignment('center').end,
        new Txt(item.puntaje_evagen).alignment('center').end,
        new Txt(item.observacion_evagen).alignment('justify').end,
      ])
    ]).
      dontBreakRows(true).
      widths([145,150,25,30,100]).
      fontSize(8).
      end;
      //calificacion
      const puntaje: IText = new Txt([
        new Txt('Se obtiene ').alignment('right').fontSize(10).end,
        new Txt(`${encabezado.puntaje_thcab} `).alignment('right').bold().fontSize(10).end,
        new Txt('puntos.').alignment('left').fontSize(10).end,
      ]).background(`${backgroud}`).color('white').end;
      //TODO:  9
      const t9: IText = new Txt('9- Acuerdos y compromisos').alignment('center').bold().fontSize(10).end;
    const acuerdo_compromiso_t: ITable = new Table([
      [
        new Txt('Acuerdos y compromisos').bold().alignment('center').end,
        new Txt('Responsable').alignment('center').bold().end,
        new Txt('Cargo').alignment('center').bold().end,
        new Txt('Fecha cumplimiento').alignment('center').bold().end,
      ],
      ...acuerdo_compromiso.map(item => [
        new Txt(item.acuerdo_acucomp).alignment('justify').end,
        new Txt(item.responsable_acucomp).alignment('justify').end,
        new Txt(item.cargo_acucomp).alignment('justify').end,
        new Txt(this._utilService.getFormatDate(item.fecha_acucomp,'yyyy-MM-dd')).alignment('center').end,
      ])
    ]).
      dontBreakRows(true).
      widths([150,150,100,50]).
      fontSize(8).
      end;
      //9.1
      const st91: IText = new Txt('9.1-Observaciones generales.').alignment('center').bold().fontSize(10).end;
    const observaciones_generales_t: ITable = new Table([
      [
        new Txt('Observaciones').bold().alignment('center').end
      ],
      ...observaciones_generales.map(item => [
        new Txt(item.observacion_evab).alignment('justify').end
      ])
    ]).
      dontBreakRows(true).
      widths([450]).
      fontSize(8).
      end;
      //9.2
      const st92: IText = new Txt('9.2 Responsables (Equipo supervisor)').alignment('justify').bold().fontSize(10).end;
    const responsables_t: ITable = new Table([
      [
        new Txt('Nombre y Apellidos').bold().alignment('center').end,
        new Txt('Cargo').alignment('center').bold().end,
        new Txt('Firma').alignment('center').bold().end,
        new Txt('Observaciones').alignment('center').bold().end,
      ],
      ...responsables.map(item => [
        new Txt(item.responsable).alignment('justify').end,
        new Txt(item.cargo).alignment('center').end,
        new Txt('').alignment('justify').end,
        new Txt(item.observacion).alignment('justify').end,
      ])
    ]).
      dontBreakRows(true).
      widths([150,100,100,100]).
      heights(40).
      fontSize(8).
      end;

    // Adding format to text
    const pdf = new PdfMakeWrapper();
    pdf.add(titulo);
    pdf.add(pdf.ln(2));
    pdf.add(res_establecimiento);
    pdf.add(pdf.ln(0.5));
    pdf.add(res_distrito);
    pdf.add(pdf.ln(0.5));
    pdf.add(res_zona);
    pdf.add(pdf.ln(1));
    pdf.add(res_central);
    pdf.add(pdf.ln(1));
    pdf.add(zona);
    pdf.add(pdf.ln(1));
    pdf.add(provincia);
    pdf.add(pdf.ln(1));
    pdf.add(ciudad);
    pdf.add(pdf.ln(1));
    pdf.add(nombre);
    pdf.add(pdf.ln(1));
    pdf.add(fecha);
    pdf.add(pdf.ln(1));
    pdf.add(hora);
    pdf.add(pdf.ln(2));
    //guia
    pdf.add(guia);
    pdf.add(pdf.ln(1));
    //1
    pdf.add(t1);
    pdf.add(st1);
    pdf.add(pdf.ln(1));
    pdf.add(talento_humano_t);
    pdf.add(pdf.ln(1));
    pdf.add(total_talento_humano);
    pdf.add(pdf.ln(1));
    //1.2
    pdf.add(st2);
    pdf.add(pdf.ln(1));
    pdf.add(espacios_t);
    pdf.add(pdf.ln(1));
    //1.3
    pdf.add(st3);
    pdf.add(pdf.ln(1));
    pdf.add(insumos_t);
    pdf.add(pdf.ln(1));
    //1.4
    pdf.add(st4);
    pdf.add(pdf.ln(1));
    pdf.add(documentacion_t);
    pdf.add(pdf.ln(1));
    //2
    pdf.add(t2);
    pdf.add(pdf.ln(1));
    pdf.add(incidencia_t);
    pdf.add(pdf.ln(1));
    //3
    pdf.add(t3);
    pdf.add(pdf.ln(1));
    pdf.add(criterio_inclusion_exclusion_t);
    pdf.add(pdf.ln(1));
    //4
    pdf.add(t4);
    pdf.add(pdf.ln(1));
    pdf.add(disponibilidad_hc_t);
    pdf.add(pdf.ln(1));
    //4.1
    pdf.add(st41);
    pdf.add(pdf.ln(1));
    pdf.add(calidad_hc_t);
    pdf.add(pdf.ln(1));
    pdf.add(calificacion_hc);
    pdf.add(pdf.ln(1));
    //5
    pdf.add(t5);
    pdf.add(pdf.ln(1));
    pdf.add(st51);
    pdf.add(pdf.ln(1));
    pdf.add(disponibilidad_med_t);
    pdf.add(pdf.ln(1));
    //5.2
    pdf.add(st52);
    pdf.add(pdf.ln(1));
    pdf.add(recetario_t);
    pdf.add(pdf.ln(1));
    //5.2.1
    pdf.add(st521);
    pdf.add(pdf.ln(1));
    //5.2.2
    pdf.add(st522);
    pdf.add(pdf.ln(1));
    pdf.add(nudo_critico_t);
    pdf.add(pdf.ln(1));
    //6
    pdf.add(t6);
    pdf.add(pdf.ln(1));
    pdf.add(actividades_asistencia_t);
    pdf.add(pdf.ln(1));
    //7
    pdf.add(t7);
    pdf.add(pdf.ln(1));
    pdf.add(st71);
    pdf.add(pdf.ln(1));
    pdf.add(resolucion_problema_t);
    pdf.add(pdf.ln(1));
    //7.2
    pdf.add(st72);
    pdf.add(pdf.ln(1));
    pdf.add(capacitacion_anual_t);
    pdf.add(pdf.ln(1));
    //7.3
    pdf.add(st73);
    pdf.add(pdf.ln(1));
    pdf.add(referencia_contrareferencia_t);
    pdf.add(pdf.ln(1));
    //7.4
    pdf.add(st74);
    pdf.add(pdf.ln(1));
    pdf.add(proceso_administrativo_t);
    pdf.add(pdf.ln(1));
    //8
    pdf.add(t8);
    pdf.add(pdf.ln(1));
    pdf.add(evaluacion_general_t);
    pdf.add(pdf.ln(1));
    pdf.add(puntaje);
    pdf.add(pdf.ln(1));
    //9
    pdf.add(t9);
    pdf.add(pdf.ln(1));
    pdf.add(acuerdo_compromiso_t);
    pdf.add(pdf.ln(1));
    //9.1
    pdf.add(st91);
    pdf.add(pdf.ln(1));
    pdf.add(observaciones_generales_t);
    pdf.add(pdf.ln(1));
    //9.2
    pdf.add(st92);
    pdf.add(pdf.ln(1));
    pdf.add(responsables_t);
    pdf.add(pdf.ln(1));
    pdf.create().download(`seguimiento_${this._utilService.getFormatDate(encabezado.fecha_thcab,'yyyyMMdd')}.pdf`);
    this._utilService.hideSpinner();
  }
}
