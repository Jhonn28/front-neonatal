import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MenuItem, SortEvent, TreeNode } from 'primeng/api';

import { TableCore } from '../../class/table-core';
import { TreeCoreComponent } from '../tree/tree.component';
import { SecurityService } from '../../services/security.service';
import { UtilsService } from '../../services/utils.service';
import { ColumnCore } from '../../class/column-core';
import { Condition } from '../../interfaces/condition';
import { MethodsService } from '../../services/methods.service';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { DialogService } from 'primeng/dynamicdialog';
import { IconsComponent } from '../../components/icons';

export interface Icon {
    namespace: string;
    name: string;
    grid: number;
    list: string[];
}


@Component({
    selector: 'cmp-table',
    templateUrl: './table.component.html',
    providers: [DialogService],
})
export class TableCoreComponent implements OnInit {

    @ViewChild('datatable', { static: false }) datatable: Table;
    @ViewChild('imgViewer', { static: false }) imgViewer: ImageViewerComponent;

    table: TableCore;
    indiceFilaActual = 0;

    public loading = false;
    public textoFiltroGlobal = '';
    public filtroGlobal = false;
    public resultadoAutocompletar: any[];
    public eliminadas: any[] = []; // almacena filas eliminadas
    public validarInsertar = false; // validacion para permitir insertar varios registros
    public relaciones: TableCoreComponent[] = []; // Agrega relación, guarda el número de tabla de la relacion
    public arbol: TreeCoreComponent;
    // Para formularios
    public mostrarPaginadorFormulario = true;
    base64: string = 'Base64...';
    // Ociones tabla
    public menuOpciones: MenuItem[];
    public isDraw = false;
    // Seleccion single / multiple se
    tipoSeleccion?: 'simple' | 'multiple';
    selectionMode = 'single';
    // Botones Tabla
    isBotonInsertar = true;
    isBotonEliminar = true;
    isBotonGuardar = true;
    isBotonFiltro = true;
    isBotonOpciones = true;
    isBotonModificar = false;
    // Filas Row Expansion
    expandible = false;
    numColumnasExpansibles = 0;
    minHeigth = '200px';

    // image
    imgTemp: any = null;
    isSelect = false;

    indexSelectIcon = null;
    nameColumnSelectIcon = null;

    // calendar
    minDate: Date;
    maxDate: Date;
    es: any;
    invalidDates: Array<Date>

    // Eventos
    onChangePage: (event?: any) => void;
    onSelectRow?: (event?: any) => void;
    onSelecciona?: (event?: any) => void;
    // Eventos
    onModificar?: (event?: any) => void;
    onEliminar?: (event?: any) => void;
    onInsertar?: (event?: any) => void;
    onDibujar?: (event?: any) => void;

    // Menu contextual
    public menuContextual: MenuItem[];
    private itemInsertar: MenuItem;
    private itemEliminar: MenuItem;
    private itemGuardar: MenuItem;
    private itemActualizar: MenuItem;
    private itemExport: MenuItem;
    private itemExportarExcel: MenuItem;
    // Servicio
    private metodoServicio: string;
    private parametrosServicio: any;

    constructor(
        private seguridadSvc: SecurityService,
        private utilitarioSvc: UtilsService,
        private _methodService: MethodsService,
        public dialogService: DialogService
    ) {
        this.table = new TableCore();
        this.isDraw = false;

    }


    ngOnInit(): void {

        // inicio el calendar
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        }

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today, invalidDate];

        // this.utilitarioSvc.showSpinner();
        this.generarOpcionesTabla();
    }

    generarOpcionesTabla(): void {
        this.menuOpciones = [];

        this.itemExportarExcel = {
            label: 'Exportar Excel',
            icon: 'pi pi-fw pi-file-excel',
            command: () => {
                // this.opcionesTabla.hide();
                this.exportExcel();
            },
        };

        this.menuOpciones.push(this.itemExportarExcel);
    }

    formarMenuContextual(): void {
        this.menuContextual = [];
        let disBotInsertar = true;
        let disBotGuardar = true;
        let disBotEliminar = true;
        const botInsertar = document.getElementById(
            'botInsertar'
        ) as HTMLButtonElement;
        const botGuardar = document.getElementById(
            'botGuardar'
        ) as HTMLButtonElement;
        const botEliminar = document.getElementById(
            'botEliminar'
        ) as HTMLButtonElement;

        if (botInsertar && !botInsertar.hidden && this.isBotonInsertar) {
            disBotInsertar = botInsertar.disabled;
            this.itemInsertar = {
                label: 'Insertar',
                icon: 'fas fa-plus-circle',
                visible: disBotInsertar,
                command: () => {
                    this.insertarClick();
                },
            };
            this.menuContextual.push(this.itemInsertar);
        }
        if (botGuardar && !botGuardar.hidden && this.isBotonGuardar) {
            disBotGuardar = botGuardar.disabled;
            this.itemGuardar = {
                label: 'Guardar',
                icon: 'fas fa-save',
                disabled: disBotGuardar,
                command: () => {
                    this.guardarClick();
                },
            };
            this.menuContextual.push(this.itemGuardar);
        }
        if (botEliminar && !botEliminar.hidden && this.isBotonEliminar) {
            disBotEliminar = botEliminar.disabled;
            this.itemEliminar = {
                label: 'Eliminar',
                icon: 'fas fa-trash',
                visible: disBotEliminar,
                command: () => {
                    this.eliminarClick();
                },
            };
            this.menuContextual.push(this.itemEliminar);
        }

        this.itemActualizar = {
            label: 'Actualizar',
            icon: 'fas fa-sync-alt',
            command: () => {
                this.update();
            },
        };

        this.menuContextual.push(this.itemActualizar);
        this.menuContextual.push({ separator: true });

        this.itemExport = {
            label: 'Exportar .xlsx',
            icon: 'fas fa-download',
            command: () => {
                this.exportExcel();
            },
        };

        //this.menuContextual.push(this.itemExport);
        // this.menuContextual.push(this.itemActualizar);
    }

    insertarClick(): void {
        if (this.onInsertar) {
            this.onInsertar({
                originalEvent: null,
            });
        } else {
            const botInsertar = document.getElementById('botInsertar');
            botInsertar.click();
        }
    }

    eliminarClick(): void {
        if (this.onEliminar) {
            this.onEliminar({
                originalEvent: null,
            });
        } else {
            const botEliminar = document.getElementById('botEliminar');
            botEliminar.click();
        }
    }

    // TODO: METHODS

    /**
     * Inicializa la tabla
     * @param tableName
     * @param primaryField
     * @param tableNumber
     */
    setTable(tableName: string, primaryField: string, tableNumber: number): Promise<ColumnCore[]> {
        this.table.tableNumber = tableNumber;
        this.table.tableName = tableName.toLowerCase();
        this.table.primaryField = primaryField.toLowerCase();
        this.fieldOrder = primaryField.toLowerCase();
        this.table.columns = new Array<ColumnCore>();
        this.table.data = [];
        return this.generateColumns();
    }


    /**
     * Actualiza la url de rest servces
     * @param service
     * @param parameters
     */
    setService(service: string, parameters: any) {
        this.metodoServicio = service;
        this.parametrosServicio = parameters;
    }

    setTableService(
        service: string,
        parameters: {} | null,
        fieldPrimary: string,
        tableNumber: number,
        columns: any
    ): Promise<ColumnCore[]> {
        this.table.tableNumber = tableNumber;
        this.metodoServicio = service;
        this.parametrosServicio = parameters;
        this.table.primaryField = fieldPrimary.toLowerCase();
        this.fieldOrder = fieldPrimary.toLowerCase();
        this.table.columns = new Array<ColumnCore>();
        this.table.data = [];
        this.setRead(true);
        const col = columns.split(' ').join('');
        const datos = col.split(',');

        return new Promise((resolve) => {
            for (const [index, colActual] of datos.entries()) {
                // console.log(index,colActual);
                const col: ColumnCore = new ColumnCore();

                col.name = colActual;
                col.visualName = colActual;
                col.order = index;
                col.width = colActual.anchocolumna || 12;
                col.type = colActual.tipo;
                col.visible = true;
                col.read = true;
                col.component = colActual.componente;
                col.comment = colActual.comentario;
                if (col.name === this.table.primaryField) {
                    //Oculta y hace lectura campo primario x defecto
                    col.visualName = 'código';
                    col.style = 'font-weight: bold;';
                    col.width = 7;
                }
                this.table.columns.push(col);
            }
            resolve(this.table.columns);
        });
    }

    setTreeTable(
        tableName: string,
        primaryField: string,
        tableNumber: number
    ): Promise<ColumnCore[]> {
        // this.table.tree = true;
        this.table.tableNumber = tableNumber;
        this.table.tableName = tableName.toLowerCase();
        this.table.primaryField = primaryField.toLowerCase();
        this.fieldOrder = primaryField.toLowerCase();
        this.table.columns = new Array<ColumnCore>();
        this.table.data = [];
        return this.generateColumns();
    }

    /**
     * Retorna un objeto columna
     * @param nameColumn
     */
    getColumn(nameColumn: string): ColumnCore {
        nameColumn = nameColumn.toLowerCase();
        const col = this.table.columns.find(col => col.name === nameColumn);
        if (this.utilitarioSvc.isUndefined(col) === false) {
            this.utilitarioSvc.addErrorMessage(
                'La columna <strong>' + nameColumn + '</strong> no existe.'
            );
        }
        return col;
    }

    getSumColumn(nameColumn: string): number {
        let total = 0.0;
        for (const data of this.table.data) {
            total += data[nameColumn];
        }
        return total;
    }

    /**
     * Consultaren el servicio web
     */
    draw(consult: boolean = true): Promise<boolean> {

        return new Promise((resolve) => {
            // console.info(this.table.tableName, this.table.tableNumber, this.table.isParent);
            if (this.isDraw === false) {
                this.generateDropdown().then(() => {
                    this.consult(consult).then(() => {
                        // console.log('Finalizo y dibujo');
                        this.isDraw = true;
                        this.sortColumns();
                        this.formarMenuContextual();
                        resolve(true);
                    });
                });
            }

        });

    }

    async consult(consult = true, tipo: 1 | 2 = 1): Promise<boolean> {
        if (this.utilitarioSvc.isUndefined(this.metodoServicio)) {
            this.consultService(consult);
        } else if (this.utilitarioSvc.isUndefined(this.table.tableName)) {
            return this.consultTable(tipo);
            // this.utilitarioSvc.hideSpinner();
        }
    }

    /**
     * Retorna si la tabla tiene el foco del menu contextual
     */
    isFocus(): boolean {
        // Si es de lectura no tiene focus
        if (this.read) {
            return false;
        }
        const elements: Element[] = Array.from(
            document.getElementsByName('dtTablaEditable')
        );
        const numTablasEditablre = elements.length;
        if (numTablasEditablre === 1) {
            return true;
        }
        for (const el of elements) {
            const numTabla = parseInt(el.getAttribute('dir'), 10);
            if (numTabla === this.table.tableNumber) {
                const valorFocus = el.getAttribute('focus');
                if (valorFocus === 'true') {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Retorna la fila seleccionada
     */
    getRowSelected(): any {
        return this.selected;
    }

    /**
     * Retorna el indice de la fila actual
     */
    getCurrentRowIndex(): number {
        return this.indiceFilaActual;
    }

    /**
     * Para tabla selección multiple
     */
    getRowSelecteds(): any[] {
        return this.table.selecteds;
    }

    /**
     * Selecciona Fila por campo primario
     */
    selectPrimaryValueRow(primaryFieldValue): void {
        const fila = this.table.data.find(fila => fila[this.table.primaryField].toString() === primaryFieldValue.toString());
        this.selected = fila;
        this.onSelect(fila);
    }

    /**
     * Retorna el valor del campo primario de la fila seleccionada
     */
    getValueSelected(): string {
        let valor = null;
        try {
            valor = this.data[this.indiceFilaActual][this.fieldPrimary];
        } catch (e) { }
        return valor;
    }

    /**
     * Asigna el valor a la clave foranea
     */
    setValueForeign(valueForeign): void {
        this.table.foreignValue = valueForeign;
    }

    /**
     * Ejecutar falor foreanea
     * @param valorForanea valor foranea FK
     */
    executeValueForeign(valueForeign): Promise<boolean> {
        this.table.foreignValue = valueForeign;
        return this.consult(true, 2);
    }

    /**
     * Ejecuta la consulta
     */
    execute(): Promise<boolean> {
        this.selected = null;
        return this.consult();
    }

    /**
     * Retorna el valor de una columna de la fila seleccionada
     * @param nameColumn
     */
    getValue(nameColumn: string): any {
        if (this.table.data) {
            if (this.selected) {
                const col = this.getColumn(nameColumn);
                if (col) {
                    let valor = this.selected[nameColumn.toLowerCase()];
                    if (col.component === 'date') {
                        if (typeof valor === 'object') {
                            // valor = this.utilitarioSvc.getFormatoFecha(valor);
                            valor = this.utilitarioSvc.getDateFormat(
                                valor,
                                this.utilitarioSvc.FORMAT_DATE_FRONT
                            );
                        }
                    } else if (col.component === 'autocomplete') {
                        if (typeof valor === 'object') {
                            valor = valor.value;
                        }
                    } else if (col.component === 'time') {
                        if (typeof valor === 'object') {
                            valor = this.utilitarioSvc.getFormatTime(valor);
                        }
                    }
                    return valor;
                } else {
                    this.utilitarioSvc.addErrorMessage(
                        'La columna ' + nameColumn + ' no existe'
                    );
                }
            }
        }
        return null;
    }

    /**
     * Retorna el valor de una columna de la una fila determinada
     * @param row
     * @param nameColumn
     */
    getValueRow(row: number, nameColumn: string): any {
        if (this.table.data) {
            const filaActual = this.data[row];
            if (filaActual) {
                const col = this.getColumn(nameColumn);
                if (col) {
                    let valor = this.selected[nameColumn.toLowerCase()];
                    if (col.component === 'date') {
                        if (typeof valor === 'object') {
                            // valor = this.utilitarioSvc.getFormatoFecha(valor);
                            valor = this.utilitarioSvc.getDateFormat(
                                valor,
                                this.utilitarioSvc.FORMAT_DATE_FRONT
                            );
                        }
                    } else if (col.component === 'autocomplete') {
                        if (typeof valor === 'object') {
                            valor = valor.value;
                        }
                    }

                    return valor;
                } else {
                    this.utilitarioSvc.addErrorMessage(
                        'La columna ' + nameColumn + ' no existe'
                    );
                }
            }
        }
        return null;
    }

    /**
     * Retorna si la tabla tiene registros o no
     */
    isEmpty(): boolean {
        if (this.data.length === 0) {
            return true;
        }
        return false;
    }

    /**
     * Selecciona el dato anterior
     */
    selectPrevious(index: number): void {
        if (this.data.length === 0) {
            this.selected = null;
            return;
        }
        index = index - 1 < 0 ? 0 : index - 1;
        this.selected = this.data[index];
    }

    /**
     * Retorna el indice de la fila seleccionada
     */
    getRowIndex(): number {
        return this.table.data.indexOf(this.selected);
    }

    /**
     * Agrega la relación a una tabla
     */
    addRelation(table: TableCoreComponent): void {
        this.relaciones.push(table);
        table.setFieldForeign(this.fieldPrimary);
    }

    /**
     * Agrega el arbol a la tabla
     */
    addTree(arbol: TreeCoreComponent): void {
        // console.log(arbol);
        this.arbol = arbol;
        this.arbol.onSelect = () => {
            this.onSelectTree();
        };
        this.table.isParent = true;
        this.table.parentField = this.arbol.fieldParent;
        this.getColumn(this.table.parentField).visible = false; // Por defecto oculta
    }

    sortColumns() {
        this.columns.sort((a, b) => (a.order < b.order ? -1 : 1));
    }



    isRowInserted() {
        try {
            const insert = this.data[this.getCurrentRowIndex()]['insertada'];
            if (this.utilitarioSvc.isUndefined(insert)) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    /**
     * Retorna filas insertadas
     */
    getInserted(): any[] {
        return this.table.data.filter(fila => fila.insertada === true);
    }

    /**
     * Retorna filas modificadas
     */
    getModified(): any[] {
        return this.table.data.filter(fila => fila.modificada === true);
    }

    /**
     * Retorna el total de filas
     */
    getTotalRows(): number {
        return this.data.length;
    }

    /**
     * Tipo Formulario
     */
    setFormType() {
        this.table.formType = true;
        this.validarInsertar = true;
    }

    setFormTable(estado: boolean) {
        if (estado) {
            this.table.read = estado;
            if (estado === true) {
                this.isBotonEliminar = false;
                this.isBotonInsertar = false;
                this.isBotonGuardar = false;
            }
            this.table.formType = false;
            this.validarInsertar = false;
        } else {
            this.table.formType = true;
            this.validarInsertar = true;
        }
    }

    /**
     * Bloquea la tabla y no permite manipular datos
     * @param read true o false
     */
    setRead(read: boolean): void {
        this.table.read = read;
        if (read === true) {
            this.isBotonEliminar = false;
            this.isBotonInsertar = false;
            this.isBotonGuardar = false;
        }
    }

    setOrderField(fieldOrder: string): void {
        this.fieldOrder = fieldOrder;
    }

    /**
     * Cambiar el tamaño de numero de filas por cada página de la tabla
     * @param rows numero de filas
     */
    setRows(rows: number): void {
        this.table.rows = rows;
    }

    /**
     * Titulo de la tabla
     * @param title titulo
     */
    setTitle(title: string): void {
        this.table.title = title.toUpperCase();
    }

    setConditions(conditions: Condition): void {
        this.table.conditions = conditions;
    }

    // retorna si es solo un registro
    isUnique(): boolean {
        if (this.table.numberRows === 1) {
            return true;
        }
        return false;
    }

    /**
     * Asigna el valor aun columna especifica
     */
    setValue(nameColumn: string, value: any): any {
        const col = this.getColumn(nameColumn);
        if (col) {
            this.selected[nameColumn.toLowerCase()] = value;
        } else {
            this.utilitarioSvc.addErrorMessage(
                'La columna ' + nameColumn + ' no existe'
            );
        }
    }

    // TODO: EVENT ACTIONS
    /**
     * Se ejecuta al ordenar una columna en tabla editable
     * @param event
     */
    onSortTableEditable(event: SortEvent): void {
        event.data.sort((data1, data2) => {
            const value1 = data1[event.field];
            const value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) {
                result = -1;
            } else if (value1 != null && value2 == null) {
                result = 1;
            } else if (value1 == null && value2 == null) {
                result = 0;
            } else if (
                typeof value1 === 'string' &&
                typeof value2 === 'string'
            ) {
                result = value1.localeCompare(value2);
            } else {
                result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
            }
            return event.order * result;
        });
    }

    /**
     * Se ejecuta cuando filtra en un Combo
     * @param event
     * @param nombreColumna
     */
    onFiltrarColumnaDropdown(event, nameColumn): void {
        if (this.getColumn(nameColumn).component === 'autocomplete') {
            // Si es autocompletar convierte en objetos los filtros
            const value = event.value;
            const objValF = [];
            for (const vafActual of value) {
                objValF.push(this.getObjectDropdown(nameColumn, vafActual));
            }
            this.datatable.filter(objValF, nameColumn, 'in');
        } else {
            this.datatable.filter(event.value, nameColumn, 'in');
        }
    }

    /**
     * Se ejcuta cuando se guarda exitosamente
     */
    onCommit(): void {
        // Quita elemento filas insertadas, modificadas
        if (this.utilitarioSvc.isUndefined(this.arbol)) {
            for (const filaActual of this.getDeleted()) {
                const auxBoraa = this.arbol.selected.children.find(
                    fila => fila.data === filaActual[this.fieldPrimary]
                );
                if (auxBoraa) {
                    const index =
                        this.arbol.selected.children.indexOf(auxBoraa);
                    this.arbol.selected.children.splice(index, 1);
                }
            }
        }

        this.eliminadas = [];

        for (const filaActual of this.getInserted()) {
            // Si tiene arbol, agrega al nodo seleccionado
            if (this.utilitarioSvc.isUndefined(this.arbol)) {
                const nuevoHijo = {
                    label: filaActual[this.arbol.fieldName],
                    data: filaActual[this.arbol.primaryField],
                    padre: filaActual[this.arbol.fieldParent],
                    icon: 'pi pi-file',
                };

                if (
                    this.utilitarioSvc.isUndefined(this.arbol.selected.children)
                ) {
                    // ya tiene hijos solo agrega
                    this.arbol.selected.children.push(nuevoHijo);
                } else {
                    // agrega y cambia el iconos
                    this.arbol.selected['children'] = [nuevoHijo];
                    this.arbol.selected.expandedIcon = 'pi pi-folder';
                    this.arbol.selected.collapsedIcon = 'pi pi-folder-open';
                }
            }
            delete filaActual['insertada'];
            this.selected = null;
        }
        for (const filaActual of this.getModified()) {
            delete filaActual['modificada'];
        }
    }

    onRowUnselect(event): void {
        this.onSelectRow({
            originalEvent: event,
        });
    }

    onSelect(row,event?): void {
      //console.log("evento=>",event);
        // this.isSelect = true;
        const rowIndex = this.table.data.indexOf(row);
        if (this.indiceFilaActual !== rowIndex) {
            // this.utilitarioSvc.showSpinner();
            this.selected = null;
            this.indiceFilaActual = rowIndex;
            this.selected = this.data[this.indiceFilaActual];
            for (const relacion of this.relaciones) {
                relacion.selected = null;
                relacion.executeValueForeign(this.getValueSelected());
            }
            // this.utilitarioSvc.hideSpinner();
        }

        if(this.onSelecciona){
          this.onSelecciona({
            originalEvent: event,
        });
        }

    }

    /**
     * Ejecuta el método on Change de la columna
     * @param event
     * @param columna
     * @param rowIndex
     */
    onChange(event, nameColumn, row): void {
        const column = this.getColumn(nameColumn);
        // console.log(event, nameColumn, row, column);
        // Valida que la columna no sea solo lectura
        if (column.read === false) {
            this.selected = row;
            if (this.utilitarioSvc.isUndefined(this.selected['insertada']) === false) {
                this.selected['modificada'] = true;
                let colModificadas = [];
                if (this.utilitarioSvc.isUndefined(this.selected['colModificadas'])) {
                    colModificadas = this.selected['colModificadas'];
                }
                colModificadas.indexOf(column.name) === -1 ? colModificadas.push(column.name) : colModificadas;
                this.selected['colModificadas'] = colModificadas;
            }
            if (column.onMetodoChange) {
                column.onMetodoChange({
                    originalEvent: event,
                });
            }
        }
    }

    onBasicUploadAuto(file: File, columnName: string, rowIndex, fileUpload) {
        // let imagenSubir = file; //solo una imagen

        /* console.log('Imagen subido >>> ', file);

        console.log(file.arrayBuffer); */

        /* readFile(file.arrayBuffer, (err, imgData) => {
            // inserting data into column 'img' of type 'bytea':
            // db.none('INSERT INTO images(img) VALUES($1)', imgData)
                .then(() => {
                    // success;
                })
                .catch(error => {
                    // error;
                });
        }); */

        if (!file) {
            return this.imgTemp = null;
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
            this.utilitarioSvc.addWarningMessage('La imagen debe estar en formato JPG o JPEG');
            fileUpload.clear();
            return;
        }
        if (file.size > 150000) {
            this.utilitarioSvc.addWarningMessage('La imagen no debe pesar más de 150Kb');
            fileUpload.clear();
            return;
        }
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.imgTemp = reader.result;
            this.data[rowIndex][columnName] = reader.result;
            //si es fila modificadas
            if (this.utilitarioSvc.isUndefined(this.selected['insertada']) == false) {
                this.selected['modificada'] = true;
                let colModificadas = [];
                if (this.utilitarioSvc.isUndefined(this.selected['colModificadas'])) {
                    colModificadas = this.selected['colModificadas'];
                }
                colModificadas.indexOf(columnName) === -1 ? colModificadas.push(columnName) : colModificadas.indexOf(columnName);
                this.selected['colModificadas'] = colModificadas;
            }
            if (this.utilitarioSvc.isUndefined(fileUpload)) {
                fileUpload.clear();
            }
        };
        fileUpload.clear();
        // console.log('event >> ', this.imgTemp);
    }


    uploadFilep12(file: File, columnName: string, rowIndex, fileUpload) {
        //console.log(file, this.selected);
        // let imagenSubir = file; //solo una imagen
        if (!file) {
            return this.imgTemp = null;
        }
        if (file.type !== 'application/x-pkcs12') {
            this.utilitarioSvc.addWarningMessage('El archivo debe ser con la extensión <strong>.p12</strong>');
            fileUpload.clear();
            return;
        }
        let archivo = file.name.split('.p12').join('');
        //console.log(`${archivo.split(" ").join("_")}_${this.utilitarioSvc.getDateCurrent('YYYYMMDDHHmmss')}`);
        this.data[rowIndex][columnName] = `${archivo.split(" ").join("_")}_${this.utilitarioSvc.getDateCurrent('YYYYMMDDHHmmss')}.p12`;;
        this.getColumn(columnName).setCleanFiles();
        this.getColumn(columnName).setFile(file);
        //this.columns['columnName'];
        //si es fila modificadas
        if (this.utilitarioSvc.isUndefined(this.selected['insertada']) == false) {
            this.selected['modificada'] = true;
            let colModificadas = [];

            if (this.utilitarioSvc.isUndefined(this.selected['colModificadas'])) {
                colModificadas = this.selected['colModificadas'];
            }
            colModificadas.indexOf(columnName) === -1 ? colModificadas.push(columnName) : colModificadas.indexOf(columnName);
            this.selected['colModificadas'] = colModificadas;
        }
        if (this.utilitarioSvc.isUndefined(fileUpload)) {
            fileUpload.clear();
        }
        fileUpload.clear();
        // console.log('event >> ', this.imgTemp);
    }

    onBlur(event, nameColumn): void {
        const column = this.getColumn(nameColumn);
        if (column.read === false) {
            if (column.setMetodoBlur) {
                column.setMetodoBlur({
                    originalEvent: event,
                });
            }
        }
    }

    /** Cuando da clic en el icono borrar del autocompletar */
    onDeleteAutoCompleteChange(event, nameColumn, fila): void {
        event.target.parentElement.firstChild.firstChild.firstChild.focus();
        this.selected = fila;
        this.selected[nameColumn] = null;
        this.onChange(event, nameColumn, fila);
    }

    /**
     * Ejecuta al dar click sobre algun componente
     * @param row
     */
    onClickComponent(row): void {
        // selecciona la fila
        this.onSelect(row);
    }

    /**
     * Ejecuta el metodo cuando da click en el componente seleccionar o combo
     */
    onClickComponentDropDown(row): void {
        // selecciona la fila
        this.onSelect(row);
        this.selected = null;
        // Ejecuta nuevamnete ya que ni pinta al cambiar a otro componente
        this.onSelect(row);
    }

    /**
     * Ejecuta filtro global
     * @param value
     */
    onGlobalFilter(value: any): void {
        if (
            !this.utilitarioSvc.isUndefined(this.datatable.globalFilterFields)
        ) {
            // filtroGlobal
            this.datatable.globalFilterFields = [];
            for (const colActual of this.columns) {
                this.datatable.globalFilterFields.push(colActual.name);
            }
        }
        this.datatable.filterGlobal(value, 'contains');
        if (value !== '') {
            this.filtroGlobal = true;
        }
    }

    /**
     * Metodo que se ejecuta al escribir en el autocompletar
     */
    onAutocomplete(event, nameColumn): void {
        const data = this.getColumn(nameColumn)
            .listDropdown.filter((fila) => {
                return (
                    fila.label
                        .toLowerCase()
                        .search(event.query.toLowerCase()) !== -1
                );
            })
            .slice(0, 10);
        this.resultadoAutocompletar = data;
    }

    /**
     * Metodo que se ejecuta al seleccionar la lista del paginador
     * @param event
     */
    onPaginatorForm(event): void {
        // console.log(event);
        this.selected = this.data[event.first];
        this.onSelect(this.selected);
        this.onChangePage({
            originalEvent: event,
        });
    }

    /**
     * Asigna el foco a la tabla actual y quita el foco a todas la tablas
     */
    onFocusTable(): void {
        // quita el foco a todos los objetos tabla o formulario que son editables
        const elements: Element[] = Array.from(
            document.getElementsByName('dtTablaEditable')
        );

        const numTablasEditablre = elements.length;
        for (const el of elements) {
            // console.log('onFocusTable ', document.getElementsByName('dtTablaEditable'), el.getAttribute('dir'));
            const numTabla = parseInt(el.getAttribute('dir'), 10);
            // si solo hay una tabla por defecto le asigna el foco
            if (numTablasEditablre === 1) {
                el.setAttribute('focus', 'true');
                return;
            }

            if (numTabla === this.table.tableNumber) {
                el.setAttribute('focus', 'true');
            } else {
                el.setAttribute('focus', 'false');
            }
        }
        //   this.formarMenuContextual();
    }

    // TODO: BUTTON ACTIONS

    /**
     * Inserta una fila nueva
     */
    insert(): void {
        // console.log('metodo insertar table');
        if (this.read === false) {
            if (this.isDraw) {
                if (
                    this.validarInsertar &&
                    this.getInserted().length > 0 &&
                    this.getTotalRows() > 0
                ) {
                    this.utilitarioSvc.addWarningMessage(
                        'Ya existe un registro insertado',
                        'No se puede insertar'
                    );
                } else {
                    this.createRow();
                }
            }
        }
    }

    delete(): void {
        if (this.read === false) {
            if (this.isDraw && this.utilitarioSvc.isUndefined(this.selected)) {
                const index: number = this.getRowIndex();
                if (this.selected.insertada) {
                    this.table.data.splice(index, 1);
                    this.selectPrevious(index);
                } else {
                    // Valida si es posible eliminar la fila seleccionada
                    if (
                        this.utilitarioSvc.isUndefined(this.getValueSelected())
                    ) {
                        const mensaje =
                            'Está seguro de que desea eliminar el registro seleccionado ?';
                        this.utilitarioSvc.confirmationAlert(mensaje, () =>
                            this.deleteData()
                        );
                    } else {
                        this.utilitarioSvc.addWarningMessage(
                            'No se encuentra seleccionado ningun registro'
                        );
                    }
                }
            }
        }
    }

    /**
     * Valida campos únicos,requeridas, valores en campos Hora,Fecha, FechaHora
     * y calcula claves primarias
     */
    async isSave(): Promise<boolean> {
        // 1 en filas nuevas
        const lisInsertadas = this.getInserted();
        const lisModificadas = this.getModified();
        const colObligatorias = this.columns.filter(col => col.required === true);
        const colUnicas = this.table.columns.filter(col => col.unique === true);
        const colEmail = this.table.columns.filter(col => col.isEmail === true);
        const colRuc = this.table.columns.filter(col => col.isRuc === true);
        /*console.warn('tabla >>> ', this.numberTable);
        console.log('lisInsertadas ', lisInsertadas);
        console.log('lisModificadas ', colObligatorias);
        console.log('colObligatorias ', colObligatorias);
        console.log('colUnicas ', colUnicas);
        console.log('colEmail ', colEmail);
        console.log('colRuc ', colRuc);*/
        for (let filaActual of lisInsertadas) {
            //TODO: Validación de valores que sean válidos
            for (const colActual of this.columns) {
                filaActual = this.validateRow(colActual, filaActual);
                if (this.isValidValue(filaActual, colActual) === false) {
                    return false;
                }
            }
            //TODO: Validación de valores Obligatorios
            for (const colActual of colObligatorias) {
                const valor = filaActual[colActual.name];
                if (this.utilitarioSvc.isUndefined(valor) === false) {
                    this.utilitarioSvc.addWarningMessage('Los valores de la columna "' + colActual.visualName + '" son obligatorios.');
                    return false;
                }
            }

            // TODO: validación valores email
            for (const colActual of colEmail) {
                const valor = filaActual[colActual.name];
                if (!this.utilitarioSvc.isEmailValid(valor)) {
                    this.utilitarioSvc.addWarningMessage('El valor de la columna "' + colActual.visualName + '" no es un email o correo válido.');
                    return false;
                }
            }

            // TODO: validación ruc
            for (const colActual of colRuc) {
                const valor = filaActual[colActual.name];
                if (!this.utilitarioSvc.isRucValid(valor)) {
                    this.utilitarioSvc.addWarningMessage('El valor de la columna "' + colActual.visualName + '" no es un RUC válido.');
                    return false;
                }
            }

            //TODO: VERIFICAR OJO
            //TODO: validación valores Unicos
            /*let booUnico = true;
            for (const colActual of colUnicas) {
                const valor = filaActual[colActual.name];
                if (this.utilitarioSvc.isUndefined(valor)) {
                    this.loading = true;
                    // Valida si es posible eliminar la fila seleccionada
                    booUnico = await this.isValidateUnique(
                        this.table.tableName,
                        colActual,
                        valor
                    );
                    if (!booUnico) {
                        return false;
                    }
                }
            }*/
        }
        // 2 en filas modificadas
        for (let filaActual of lisModificadas) {
            // Valores Obligatorios solo columnas modificadas
            const colModificadas = filaActual.colModificadas;
            for (const colNombreActual of colModificadas) {
                // solo nombres de columnas modificadas
                const colActual = this.getColumn(colNombreActual);
                // Validacion de valores que sean válidos
                filaActual = this.validateRow(colActual, filaActual);
                if (this.isValidValue(filaActual, colActual) === false) {
                    return false;
                }

                if (colActual.required) {
                    // filaActual = this.validarFila(colActual, filaActual);
                    const valor = filaActual[colNombreActual];
                    if (this.utilitarioSvc.isUndefined(valor) === false) {
                        this.utilitarioSvc.addWarningMessage('Los valores de la columna "' + colActual.visualName + '" son obligatorios');
                        return false;
                    }
                }

                if (colActual.isEmail) {
                    const valor = filaActual[colActual.name];
                    if (!this.utilitarioSvc.isEmailValid(valor)) {
                        this.utilitarioSvc.addWarningMessage('El valor de la columna "' + colActual.visualName + '" no es un email o correo válido.');
                        return false;
                    }
                }

                if (colActual.isRuc) {
                    const valor = filaActual[colActual.name];
                    if (!this.utilitarioSvc.isRucValid(valor)) {
                        this.utilitarioSvc.addWarningMessage('El valor de la columna "' + colActual.visualName + '" no es un RUC válido.');
                        return false;
                    }
                }
            }
        }
        // console.log(this.getValueSelected());
        this.updateForaneaRelationships(this.getValueSelected());
        return true;
    }

    /**
     * Actualiza los datos
     */
    async update(): Promise<void> {
        this.eliminadas = [];
        this.textoFiltroGlobal = '';
        this.filtroGlobal = false;
        await this.generateDropdown().then(async () => {
            await this.consult(true, 2);
        });
    }

    save(): any[] {
        const listaSQL = [];
        const lisInsertadas = this.getInserted();
        const colMayusculas = this.table.columns.filter(col => col.uppercase === true);
        const colCombo = this.table.columns.filter(col => col.isDropdown === true);

        //const colFecha = this.table.columns.filter(col => col.component.includes('date'));
        // TODO: recorro los insertados
        for (const filaActual of lisInsertadas) {
            const objInsert = {};
            objInsert['tipo'] = 'insertar';
            objInsert['nombreTabla'] = this.table.tableName.toLowerCase();
            objInsert['campoPrimario'] = this.table.primaryField.toLowerCase();
            objInsert['campoforanea'] = this.table.foreignField;
            let relations = '';

            for (const relacion of this.relaciones) {
                if (this.relaciones.length > 1) {
                    relations += relacion.tablaName + ',';
                } else {
                    relations += relacion.tablaName;
                }
            }
            objInsert['relacion'] = relations;
            // objInsert['columnas'] = columnasInsert,
            // Valores a Insertar
            const valoresInsertados = {};
            for (const colActual of this.table.columns) {
                // filaActual = this.validarFila(colActual, filaActual);
                // console.log(colActual.name,filaActual[colActual.name]);
                valoresInsertados[colActual.name] = filaActual[colActual.name];
                // Formato fecha para la base de datos
                if (colActual.component === 'date') {
                    // TODO: Comento esta validacion
                    // valoresInsertados[colActual.name] = this.utilitarioSvc.getDateFormat(this.utilitarioSvc.toDate(filaActual[colActual.name], this.utilitarioSvc.FORMAT_DATE_FRONT));
                }
            }
            objInsert['valores'] = valoresInsertados;
            listaSQL.push(objInsert);
        }
        // TODO: recorro los modificados
        const lisModificadas = this.getModified();
        for (let filaActual of lisModificadas) {
            const objModifica = {};
            objModifica['tipo'] = 'modificar';
            objModifica['nombreTabla'] = this.table.tableName.toLowerCase();
            // valores en blanco to null Fechas
            /*for (const colActual of colFecha) {
        filaActual = this.validateRow(colActual, filaActual);
      }*/
            // Valores Mayusculas
            for (const colActual of colMayusculas) {
                filaActual = this.validateRow(colActual, filaActual);
                const valor = filaActual[colActual.name];
                if (this.utilitarioSvc.isUndefined(valor)) {
                    filaActual[colActual.name] = valor.toUpperCase();
                }
            }
            // Valores Autocompletar obj
            for (const colActual of colCombo) {
                filaActual = this.validateRow(colActual, filaActual);
            }
            // Columnas modificadas
            const colModificadas = filaActual.colModificadas;
            const valoresModifica = {};
            for (const colM of colModificadas) {
                valoresModifica[colM] = filaActual[colM.toLowerCase()];
                // Formato fecha para la base de datos
                if (this.getColumn(colM.toLowerCase()).component === 'date') {
                    //console.log('formato fecha > ', filaActual[colM.toLowerCase()], this.utilitarioSvc.toDate(filaActual[colM.toLowerCase()], this.utilitarioSvc.FORMAT_DATE_FRONT));
                    // TODO: comento esta validacion
                    // valoresModifica[colM] = this.utilitarioSvc.getDateFormat(this.utilitarioSvc.toDate(filaActual[colM.toLowerCase()], this.utilitarioSvc.FORMAT_DATE_FRONT));
                }
            }
            objModifica['valores'] = valoresModifica;
            const condicionModifica: Condition = {
                condition:
                    this.fieldPrimary +
                    ' = ' +
                    [filaActual[this.table.primaryField.toLowerCase()]],
                values: [filaActual[this.table.primaryField.toLowerCase()]],
            };
            objModifica['condiciones'] = [condicionModifica];
            listaSQL.push(objModifica);
        }
        return listaSQL;
    }

    clean(): void {
        this.table.data = [];
        this.selected = null;
        // limpia tambien las relaciones
        for (const relacion of this.relaciones) {
            relacion.clean();
        }
    }
    // Exportaciones
    exportExcel(): void {
        // Genera el arreglo a Exportar
        const datosExporta = [];
        const colVisibles = this.columns.filter(col => col.visible === true);
        for (const filaActual of this.data) {
            const filaNueva = {};
            for (const colActual of colVisibles) {
                let valor = filaActual[colActual.name];
                const nombreColumna = colActual.visualName.toUpperCase();
                if (colActual.isDropdown) {
                    if (typeof valor === 'object') {
                        const obj = valor;
                        if (this.utilitarioSvc.isUndefined(obj)) {
                            valor = obj.label;
                        }
                    } else {
                        valor = this.getFieldNameDropdown(
                            colActual.name,
                            valor
                        );
                    }
                }
                filaNueva[nombreColumna] = valor;
            }
            datosExporta.push(filaNueva);
        }
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datosExporta);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'archivo');
        });
    }


    /**
     * height table
     * Flex = auto height
     * default = 200px
     */
    setHeight(height: string) {
        if (height === 'flex' || height === 'FLEX') {
            this.minHeigth = '200px';
        }
        this.minHeigth = height;
        this.table.height = height;
    }



    // TODO: GETTERS

    get numberTable() {
        return this.table.tableNumber;
    }

    get numberTableString(): string {
        return this.table.tableNumber + '';
    }

    get typeForm(): boolean {
        return this.table.formType;
    }

    get title(): string {
        return this.table.title;
    }

    get pagination(): boolean {
        if (this.data) {
            if (this.table.rows >= this.data.length) {
                return false;
            }
        }
        return true;
    }

    get columns(): ColumnCore[] {
        return this.table.columns;
    }

    get data(): ColumnCore[] {
        return this.table.data;
    }

    get read(): boolean {
        if (this.table) {
            return this.table.read;
        }
        return false;
    }

    get selected(): any {
        return this.table.selected;
    }

    get fieldOrder(): string {
        return this.table.orderField;
    }

    get tablaName(): string {
        return this.table.tableName;
    }

    get fieldPrimary(): string {
        return this.table.primaryField;
    }

    get numberRows(): number {
        return this.table.numberRows;
    }

    // TODO: SETTERS

    set typeForm(typeForm: boolean) {
        this.table.formType = typeForm;
    }

    set title(title: string) {
        this.table.title = title.toUpperCase();
    }

    set read(read: boolean) {
        this.table.read = read;
    }

    set selected(selected: any) {
        this.table.selected = selected;
    }

    set fieldOrder(fieldOrder: string) {
        this.table.orderField = fieldOrder.toLowerCase();
    }

    set rows(rows: number) {
        this.table.rows = rows;
    }

    set fieldPrimary(fieldPrimary: string) {
        this.table.primaryField = fieldPrimary;
    }

    set numberRows(numberRows: number) {
        this.table.numberRows = numberRows;
    }

    paginate(event) {
        // console.log(event);
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    // TODO: Nuevos metodos

    /**
     * Permite mostrar u ocultar la tabla
     * @param visible true o false
     *
     */
    setVisible(visible: boolean) {
        this.table.isVisible = visible;
    }


    /**
     * Open view Imagen
     */
    openImageViewer(nameColumn, rowIndex): void {
        const src = this.data[rowIndex][nameColumn];
        const titulo = this.getColumn(nameColumn).visualName.toUpperCase();
        this.imgViewer.setImagen(src);
        this.imgViewer.setTitle(titulo);
        this.imgViewer.show();
    }


    /**
     * Abre el modal para seleccionar el icono
     */
    openModalIcon(nameColumn: string, rowIndex) {

        // console.log(nameColumn, rowIndex, this.data[rowIndex][nameColumn]);
        this.nameColumnSelectIcon = nameColumn;
        this.indexSelectIcon = rowIndex;
        const ref = this.dialogService.open(IconsComponent, {
            header: 'SELECCIONAR ICONO',
            width: '65%',
            data: {
                icon: this.data[rowIndex][nameColumn]
            },
            modal: true,
            //closable: ,
            dismissableMask: false,
            /*  contentStyle: {
               "padding-bottom": "60px"
             } */
        });
        ref.onClose.subscribe((icono) => {
            // console.log('icono seleccionado >> ', icono);
            if (icono) {
                this.selectedIcon(icono);
            }
        });
    }

    /**
     * Ejecuta el metodo al seleccionar y dar click en aceptar en el boton del dialogo
     */
    selectedIcon(icon: string) {
        this.data[this.indexSelectIcon][this.nameColumnSelectIcon] = icon;
        //si es fila modificadas
        if (this.utilitarioSvc.isUndefined(this.selected['insertada']) == false) {
            this.selected['modificada'] = true;
            let colModificadas = [];
            if (this.utilitarioSvc.isUndefined(this.selected['colModificadas'])) {
                colModificadas = this.selected['colModificadas'];
            }
            colModificadas.indexOf(this.nameColumnSelectIcon) === -1 ? colModificadas.push(this.nameColumnSelectIcon) : colModificadas.indexOf(this.nameColumnSelectIcon);
            this.selected['colModificadas'] = colModificadas;
        }
    }


    /**Ejecuta y actualiza un dropdown en especifico con nuevas condiciones */
    updateDropdown(nameColumn: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const col = this.getColumn(nameColumn);
            if (col) {
                // console.log(col);
                if (!col.isDropdown) {
                    resolve(false);
                    return this.utilitarioSvc.addErrorMessage('La columna ' + nameColumn + ' no existe.');
                }

                //TODO: verifico si es un dropdown con servicio o tabla
                if (this.utilitarioSvc.isUndefined(col.configDropdown.service)) {
                    this.seguridadSvc.getDropdownService(col.configDropdown.service, col.configDropdown.body)
                        .subscribe(
                            (resp) => {
                                if (resp.data) {
                                    col.listDropdown =
                                        resp.data;
                                    if (col.nullDropdown) {
                                        // Agrega null a opcion
                                        col.listDropdown.unshift({
                                            value: null,
                                            label: 'Seleccionar ...',
                                        });
                                    }
                                }
                                resolve(true);
                            },
                            (err) => {
                                resolve(false);
                            }
                        );
                } else { // TODO:
                    this.seguridadSvc.getDropdownTable(
                        col.configDropdown.tableName,
                        col.configDropdown.primaryField,
                        col.configDropdown.nameField,
                        col.configDropdown.condition
                    )
                        .subscribe(
                            (resp) => {
                                const respuest: any = resp;
                                if (respuest.data) {
                                    col.listDropdown = respuest.data;
                                    if (col.nullDropdown) {
                                        col.listDropdown.unshift({
                                            value: null,
                                            label: 'Seleccionar ...',
                                        });
                                    }
                                }
                                resolve(true);
                            },
                            (err) => {
                                resolve(false);
                            }
                        );
                }

            } else {
                resolve(false);
                return this.utilitarioSvc.addErrorMessage('La columna ' + nameColumn + ' no existe.');
            }
        });

    }

    // TODO: METOHDS PRIVATE

    private generateColumns(): Promise<ColumnCore[]> {
      const uidOption = parseInt(this.utilitarioSvc.getUidOption(), 10);
      //console.log("Columnas",uidOption);

        // console.log(ide_opci);
        return new Promise((resolve) => {
            this.seguridadSvc
                .getColumnsTable(
                    this.table.tableName,
                    this.table.primaryField,
                    uidOption,
                    this.table.tableNumber
                )
                .subscribe(
                    async (resp) => {
                      //console.log("Respuesta",resp);
                        const respuesta: any = resp;
                        if (respuesta.data) {
                            for (const colActual of respuesta.data) {
                                const col: ColumnCore = new ColumnCore();
                                col.name = colActual.nombre;
                                col.visualName =
                                    colActual.nombrevisual.toUpperCase();
                                col.order = colActual.orden;
                                col.required = colActual.requerida;
                                col.type = colActual.tipo;
                                col.length = colActual.longitud;
                                col.decimals = colActual.decimales;
                                col.component = colActual.componente;
                                //col.width = 25;
                                col.visible = colActual.visible || true;
                                col.read = colActual.lectura || false;
                                col.defaultValue = colActual.valordefecto;
                                col.mask = colActual.mascara;
                                col.comment = colActual.comentario;
                                col.uppercase = colActual.mayusculas || false;
                                col.unique = colActual.unico || false;
                                if (col.component === 'check') {
                                    col.defaultValue = true;
                                    col.width = 7;
                                }
                                // Oculta y hace lectura campo campo primario y los de auditoria
                                if (
                                    col.name === 'user_insert' ||
                                    col.name === 'date_insert' ||
                                    col.name === 'time_insert' ||
                                    col.name === 'user_update' ||
                                    col.name === 'date_update' ||
                                    col.name === 'time_update'
                                ) {
                                    col.visible = false;
                                    col.read = true;
                                }

                                // asigna los campos de empresa multinacional y sucursal
                                if (col.name === 'ide_segcoor2') {
                                    col.visible = false;
                                } else if (col.name === 'ide_segdis2') {
                                    col.visible = false;
                                } else if (col.name === 'ide_seges2') {
                                    col.visible = false;
                                }

                                if (col.name === this.table.primaryField) {
                                    col.read = true;
                                    col.align = 'center';
                                    col.component = 'uid';
                                    col.visualName = 'código';
                                    col.style = 'font-weight: bold;';
                                    col.width = 7;
                                }
                                this.table.columns.push(col);
                            }
                            // console.log(this.table.columns);
                            // Oculta campo Foraneo por defecto
                            if (
                                this.utilitarioSvc.isUndefined(
                                    this.table.foreignField
                                )
                            ) {
                                this.getColumn(
                                    this.table.foreignField
                                ).visible = false;
                            }
                        }
                        resolve(this.table.columns);
                    },
                    (err) => {
                        this.loading = false;
                    }
                );
        });
    }

    private consultService(consult: boolean) {
        this.loading = true;
        //Guarda valor fila seleccionada si no es fila insertada
        let valorPrimariaSelec = null;
        if (this.isDraw) {
            if (this.selected != null) {
                if (!this.isRowInserted2(this.getCurrentRowIndex())) {
                    valorPrimariaSelec = this.getValueSelected();
                }
            }
        }
        // this.table.data=[];
        // this.parametrosServicio['soloColumnas'] = false;
        if (!consult) {
            return this.loading = false;
        }
        this.selected = null;
        this._methodService.get(this.metodoServicio)
            .subscribe(
                (resp) => {
                    const respuest: any = resp;
                    // console.log('Respuesta de la tabla > ', resp)
                    if (respuest.data) {
                        this.table.data = respuest.data;
                        //TODO: convertir tipo de datos date
                        const columnasFechas = this.columns.filter(col => col.component === 'date');

                        if (columnasFechas.length > 0) {
                            this.data.forEach((fila) => {
                                for (const colAcutal of columnasFechas) {
                                    fila[colAcutal.name] = this.utilitarioSvc.getDateFormat(fila[colAcutal.name], 'YYYY-MM-DD');
                                }
                            });
                        }
                        //Si no hay fila seleccionada
                        if (this.utilitarioSvc.isUndefined(valorPrimariaSelec) === false) {
                            this.indiceFilaActual = 0;
                            //selecciona la primera fila
                            if (this.data.length > 0) {
                                this.selected = this.data[0];
                            }
                        } else {
                            //selecciona fila marcada antes de consultar
                            if (this.utilitarioSvc.isUndefined(valorPrimariaSelec)) {
                                this.selectPrimaryValueRow(valorPrimariaSelec);
                            }
                        }
                        this.loading = false;
                        for (let relacion of this.relaciones) {
                            relacion.selected = null;
                            relacion.executeValueForeign(
                                this.getValueSelected()
                            );
                        }
                    }
                },
                (err) => {
                    // this.utilitarioSvc.agregarMensajeErrorServicioWeb(err);
                    this.loading = false;
                }
            );
    }

    /**
     * Forma los combos de las columnas configuradas
     */
    private generateDropdown(): Promise<boolean> {
        // Forma objetos a las columnas combo en tabla editable
        return new Promise(async (resolve) => {
            const columnasCombo = this.columns.filter(
                col => col.isDropdown === true
            );
            // console.log('combo >> ', columnasCombo);
            for (const colActual of columnasCombo) {
                // colActual.listaCombo = [];
                if (
                    this.utilitarioSvc.isUndefined(
                        colActual.configDropdown.service
                    )
                ) {
                    // es combo service
                    await new Promise((resolve) => {
                        this.seguridadSvc
                            .getDropdownService(
                                colActual.configDropdown.service, colActual.configDropdown.body
                            )
                            .subscribe(
                                (resp) => {
                                    const respuest: any = resp;
                                    // console.log(resp);
                                    if (respuest.data) {
                                        colActual.listDropdown =
                                            respuest.data;
                                        if (colActual.nullDropdown) {
                                            // Agrega null a opcion
                                            colActual.listDropdown.unshift({
                                                value: null,
                                                label: 'Seleccionar ...',
                                            });
                                        }
                                    }
                                    resolve(true);
                                },
                                (err) => {
                                    resolve(false);
                                }
                            );

                    });
                } else if (
                    this.utilitarioSvc.isUndefined(colActual.configDropdown.url)
                ) {
                    await new Promise((resolve) => {
                        this.seguridadSvc
                            .getJsonFile(colActual.configDropdown.url)
                            .then(
                                (resp) => {
                                    // console.log(resp);
                                    if (resp) {
                                        colActual.listDropdown = resp;
                                        if (colActual.nullDropdown) {
                                            // Agrega null a opcion
                                            colActual.listDropdown.unshift({
                                                value: null,
                                                label: 'Seleccionar ...',
                                            });
                                        }
                                        // console.log(colActual.configCombo.ruta, colActual.listaCombo);
                                    }
                                    resolve(true);
                                },
                                (err) => {
                                    resolve(false);
                                }
                            );
                    });
                } else if (
                    this.utilitarioSvc.isUndefined(
                        colActual.configDropdown.object
                    )
                ) {
                    await new Promise((resolve) => {
                        colActual.listDropdown =
                            colActual.configDropdown.object;
                        resolve(true);
                    });
                } else {
                    // es combo tabla
                    await new Promise((resolve) => {
                        // console.log(colActual.configDropdown);
                        this.seguridadSvc
                            .getDropdownTable(
                                colActual.configDropdown.tableName,
                                colActual.configDropdown.primaryField,
                                colActual.configDropdown.nameField,
                                colActual.configDropdown.condition
                            )
                            .subscribe(
                                (resp) => {
                                    const respuest: any = resp;
                                    if (respuest.data) {
                                        colActual.listDropdown = respuest.data;
                                        if (colActual.nullDropdown) {
                                            // Agrega null a opcion
                                            colActual.listDropdown.unshift({
                                                value: null,
                                                label: 'Seleccionar ...',
                                            });
                                        }
                                    }
                                    resolve(true);
                                },
                                (err) => {
                                    resolve(false);
                                }
                            );
                    });
                }
            }
            resolve(true);
        });
    }

    /**
     * Consulta cuando se recibe el nombre de la tabla y campoPrimario
     */
    private async consultTable(tipo: 1 | 2 = 1): Promise<boolean> {
        this.loading = true;

        const condicionesTabla: Condition[] = [];
        let queryCondition = '';
        let condicionesArbol: Condition;
        // TODO: condicion padre y foranea
        if (this.utilitarioSvc.isUndefined(this.table.foreignField) && this.utilitarioSvc.isUndefined(this.table.parentField)) {
            //console.error('soy padre y arbol');
            let condicionForanea = this.table.foreignField + ' = $1';
            let valorPadre = -1;
            let valorForanea = -1;
            const valoresCondicion = [];
            /*let condicionPadre = this.table.parentField + ' IS NULL';
            */
            if (this.utilitarioSvc.isUndefined(this.table.foreignValue)) {
                queryCondition += ` AND ${this.table.foreignField} = ${this.table.foreignValue}`;
                valorForanea = this.table.foreignValue;
            }
            if (this.utilitarioSvc.isUndefined(this.table.parentValue)) {
                queryCondition += ` AND ${this.table.parentField} = ${this.table.parentValue}`;
                /*condicionPadre = this.table.parentField + ' = $2';*/
                valorPadre = this.table.parentValue;
            } else {
                queryCondition += ` AND ${this.table.parentField} IS NULL`;
            }
            if (valorPadre !== -1) {
                valoresCondicion.push(valorPadre);
            }
            /*valoresCondicion.push(valorForanea);
            const condicionTree: Condition = {
                condition: condicionPadre + ' AND ' + condicionForanea,
                values: valoresCondicion,
            };*/
            condicionesArbol = {
                condition: condicionForanea,
                values: [valorForanea],
            };
            //console.log('arbol dependencia', this.arbol.tableName);
            // condicionesTabla.push(condicionTree);
        } else if (this.utilitarioSvc.isUndefined(this.table.foreignField)) {
            // TODO: Condicion foranea
            let condicionForanea = this.table.foreignField + ' = $1';
            let valorForanea = -1;
            const valoresCondicion = [];
            // console.error('valor padre >> ', this.table.foreignValue);
            if (this.utilitarioSvc.isUndefined(this.table.foreignValue)) {
                // condicionForanea = this.table.foreignField + ' = $1';
                // valorForanea = this.table.foreignValue;
                queryCondition += ` AND ${this.table.foreignField} = ${this.table.foreignValue}`;
            }
            /* valoresCondicion.push(valorForanea);
             const condFora: Condition = {
                 condition: condicionForanea,
                 values: valoresCondicion,
             };
             condicionesTabla.push(condFora);*/
        } else if (this.utilitarioSvc.isUndefined(this.table.parentField)) {
            // TODO: Condicion Padre
            /*let condicionPadre = this.table.parentField + ' IS NULL';
            let valorPadre = -1;
            const valoresCondicion = [];*/
            if (this.utilitarioSvc.isUndefined(this.table.parentValue)) {
                /*condicionPadre = this.table.parentField + ' = $1';
                valorPadre = this.table.parentValue;*/
                queryCondition += ` AND ${this.table.parentField} = ${this.table.parentValue}`;
            } else {
                queryCondition += `AND ${this.table.parentField} IS NULL`;
            }
            /*if (valorPadre !== -1) {
                valoresCondicion.push(valorPadre);
            }

            const condPad: Condition = {
                condition: condicionPadre,
                values: valoresCondicion,
            };
            condicionesTabla.push(condPad);*/
        }

        /*if (!this.utilitarioSvc.getAdminMultinacional()) {*/

        this.columns.forEach((element) => {
            if (element.name === 'ide_segcoor2') {
                queryCondition += ` AND ide_segcoor = ${this.utilitarioSvc.getMultinacional()}`;
            }
            if (element.name === 'ide_segemp2') {
                queryCondition += ` AND ide_segdis=${this.utilitarioSvc.getEmpresa()}`;
            }
            if (element.name === 'ide_segsuc2') {
                queryCondition += ` AND ide_seges=${this.utilitarioSvc.getSucursal()}`;
            }
        });

        /*if (this.utilitarioSvc.isUndefined(this.table.foreignField) && this.utilitarioSvc.isUndefined(this.table.parentField)) {
            let condicionEmpresa = '';
            const valoresCondicion = [];
            this.columns.forEach(element => {
                if (element.name === 'ide_segmul') {
                    condicionEmpresa += ' and ide_segmul = $3 ';
                    valoresCondicion.push(this.utilitarioSvc.getMultinacional());
                }
                if (element.name === 'ide_segemp') {
                    condicionEmpresa += ' and ide_segemp=$4';
                    valoresCondicion.push(this.utilitarioSvc.getEmpresa());
                }
                if (element.name === 'ide_segsuc') {
                    condicionEmpresa += ' and ide_segsuc=$5';
                    valoresCondicion.push(this.utilitarioSvc.getSucursal());
                }
            });
            if (condicionEmpresa) {
                const condPad: Condition = {
                    condition: condicionEmpresa,
                    values: valoresCondicion,
                };
                condicionesTabla.push(condPad);
            }

        } else {
            let condicionEmpresa = '';
            let condicionMulti = '';
            let condicionEmp = '';
            let condicionSucu = '';
            const valoresCondicion = [];
            this.columns.forEach(element => {
                if (element.name === 'ide_segmul') {
                    condicionMulti = ' ide_segmul=$1';
                    valoresCondicion.push(this.utilitarioSvc.getMultinacional());
                }
                if (element.name === 'ide_segemp') {
                    condicionEmp = condicionEmpresa + ' and ide_segemp=$2';
                    valoresCondicion.push(this.utilitarioSvc.getEmpresa());
                }
                if (element.name === 'ide_segsuc') {
                    condicionSucu = condicionEmpresa + ' and ide_segsuc=$3';
                    valoresCondicion.push(this.utilitarioSvc.getSucursal());
                }
            });
            condicionEmpresa = condicionMulti + condicionEmp + condicionSucu;
            //console.log(condicionEmpresa,valoresCondicion.reverse(),this.utilitarioSvc.getMultinacional());
            if (condicionEmpresa) {
                const condPad: Condition = {
                    condition: condicionEmpresa,
                    values: valoresCondicion.reverse(),
                };
                //condicionesTabla.push(condPad);
            }
        }*/
        /*}*/

        // TODO: Condicion de la tabla
        if (this.utilitarioSvc.isUndefined(this.table.conditions)) {
            condicionesTabla.push(this.table.conditions);
        }
        //TODO: Guarda valor fila seleccionada si no es fila insertada
        let valorPrimariaSelec = null;
        if (this.isDraw) {
            if (this.selected != null) {
                if (!this.isRowInserted2(this.getCurrentRowIndex())) {
                    valorPrimariaSelec = this.getValueSelected();
                }
            }
        }
        // TODO: Ejecuto api consultable
        // console.log(condicionesTabla);
        // console.info(this.table.tableName, this.table.tableNumber, tipo, this.table.isParent, condicionesTabla);
        // console.log(this.table.columns);
        // console.log(this.table.columns);


        return new Promise((resolve) => {
            this.seguridadSvc.getConsultTable(this.table.tableName, this.table.orderField, condicionesTabla, queryCondition)
                .subscribe((res) => {
                    // console.log('respuesta >> ', res);
                    if (res.data) {
                        this.table.data = res.data;

                        //TODO: convertir tipo de datos date
                        const columnasFechas = this.columns.filter(
                            col => col.component === 'date'
                        );

                        if (columnasFechas.length > 0) {
                            this.data.forEach((fila) => {
                                for (const colAcutal of columnasFechas) {
                                    fila[colAcutal.name] = (fila[colAcutal.name])? this.utilitarioSvc.getDateFormat(fila[colAcutal.name], 'YYYY-MM-DD'): fila[colAcutal.name];
                                }
                            });
                        }
                        //formateo formato bigint
                        const columnsBigint = this.columns.filter(
                            col => col.type === 'bigint'
                        );
                        if (columnsBigint.length > 0) {
                            this.data.forEach((fila) => {
                                for (const colActual of columnsBigint) {
                                    fila[colActual.name] = (fila[colActual.name]) ? parseInt(fila[colActual.name]) : fila[colActual.name];
                                }
                            });
                        }

                        if (!this.read) {
                            //Forma objetos a las columnas combo en tabla editable
                            const columnasAutocompletar = this.columns.filter(col => col.component === 'autocomplete' || col.component === 'imageAutocomplete');
                            if (columnasAutocompletar.length > 0) {
                                this.data.forEach((fila) => {
                                    for (const colActual of columnasAutocompletar) {
                                        const valorAnterior = fila[colActual.name];
                                        if (this.utilitarioSvc.isUndefined(valorAnterior)) {
                                            fila[colActual.name] = this.getObjectDropdown(colActual.name, valorAnterior);
                                        }
                                    }
                                });
                            }
                        }

                        //TODO: Si no hay fila seleccionada
                        if (this.utilitarioSvc.isUndefined(valorPrimariaSelec === false)) {
                            this.indiceFilaActual = 0;
                            //selecciona la primera fila
                            if (this.data.length > 0) {
                                this.selected = this.data[0];
                            } else {
                                //si es tipo formulario y no hay datos inserta una fila
                                if (this.typeForm) {
                                    if (this.read === false) {
                                        this.createRow();
                                    }
                                }
                            }
                        } else {
                            // selecciona fila marcada antes de consultar
                            if (this.utilitarioSvc.isUndefined(valorPrimariaSelec)) {
                                this.selectPrimaryValueRow(valorPrimariaSelec);
                            }
                        }

                        //TODO: Condicion arbol
                        if (this.table.isParent) {
                            // verifico que no se ejecute la consulta del arbol si esta da click en el arbol
                            if (!this.arbol.isSelect) {
                                this.arbol.conditions = condicionesArbol;
                                this.arbol.executeTree();
                            } else {
                                this.arbol.isSelect = false;
                            }
                        }

                        //Asigna el foco a la tabla 1 si la tabla es editable

                        if (this.read === false) {
                            if (this.table.tableNumber === 1) {
                                this.setFocus();
                            }
                        }
                        if (this.onDibujar) {
                            this.onDibujar({
                                originalEvent: null,
                            });
                        }



                        // TODO: Executo todas las relaciones que tenga la tabla
                        if (tipo === 1) {
                            //Ejecuta relaciones que tiene la tablas
                            for (const relacion of this.relaciones) {
                                relacion.selected = null;
                                // console.log('valor celeccionado >> ', this.relaciones.length, this.getValueSelected());
                                relacion.table.foreignValue = +this.getValueSelected();
                                // relacion.setValueForeign(this.getValueSelected());// foreignValue = parseInt(this.getValueSelected());
                            }
                        } else if (tipo === 2) {
                            if (this.relaciones.length > 0) {
                                for (const relacion of this.relaciones) {
                                    relacion.selected = null;
                                    relacion.executeValueForeign(this.getValueSelected());
                                }
                            }
                        }

                    }
                    this.loading = false;
                    resolve(true);
                },
                    (err) => {
                        resolve(true);
                        this.loading = false;
                    });
        });
        // console.log('relaciones > ', this.relaciones);

    }

    /**
     * Retorna el valor a mostrarse en una columna de tipo Combo
     * @param nameColumn
     * @param value
     */
    private getFieldNameDropdown(nameColumn, value): string {
        if (
            this.getColumn(nameColumn).listDropdown.length > 0 &&
            value !== null
        ) {
            const obj = this.getColumn(nameColumn).listDropdown.find(
                x => x.value === value
            );
            return obj.label;
        }
        return value;
    }

    /**
     * Retorna objeto del Combo
     * @param nameColumn
     * @param value
     */
    private getObjectDropdown(nameColumn: string, value): any {
        if (
            this.utilitarioSvc.isUndefined(
                this.getColumn(nameColumn).listDropdown
            )
        ) {
            if (
                this.getColumn(nameColumn).listDropdown.length > 0 &&
                value !== null
            ) {
                const obj = this.getColumn(nameColumn).listDropdown.find(
                    x => x.value === value
                );
                return obj;
            }
        }
        return null;
    }

    private isValidValue(row: any, column: ColumnCore): boolean {
        // Valida tipos de datos
        let valor = row[column.name];
        if (valor === '') {
            valor = null;
        }

        if (this.utilitarioSvc.isUndefined(valor)) {
            if (column.component === 'date') {
                if (typeof valor === 'object') {
                    // row[column.nombre] = this.utilitarioSvc.getFormatoFecha(valor);
                    row[column.name] = this.utilitarioSvc.getDateFormat(
                        valor,
                        this.utilitarioSvc.FORMAT_DATE_FRONT
                    );
                }
                // valida que sea una fecha valida
                valor = this.utilitarioSvc.getDateFormat(
                    row[column.name],
                    'DD-MM-YYYY'
                );
                // console.log('fecha > ', row[column.name], valor);
                // const d = new Date(valor);
                if (
                    this.utilitarioSvc.isValidDate(
                        valor,
                        this.utilitarioSvc.FORMAT_DATE_FRONT
                    ) === false
                ) {
                    this.utilitarioSvc.addWarningMessage(
                        'Fecha no válida ' +
                        '<strong>' +
                        valor +
                        '</strong> en la columna "' +
                        column.visualName.toUpperCase() +
                        '"'
                    );
                    return false;
                }
            }
      // comento yo
      /*else if (column.component === 'time') {
        // valida que sea una hora valida
        if (typeof valor !== 'object') {
          const d = new Date(
            this.utilitarioSvc.toDate('2020-01-01 ' + valor)
          );
          if (isNaN(d.getTime())) {
            this.utilitarioSvc.addWarningMessage(
              'Hora no válida ' +
              '<strong>' +
              valor +
              '</strong> en la columna "' +
              column.visualName.toUpperCase() +
              '"'
            );
            return false;
          }
          row[column.name] = d;
        }
        valor = row[column.name];
        const d = new Date(valor);
        row[column.name] = this.utilitarioSvc.getFormatTime(d);
      }*/ else if (column.component === 'datetime') {
                if (typeof valor === 'object') {
                    // row[column.nombre] = this.utilitarioSvc.getFormatoFechaHora(valor);
                    row[column.name] = this.utilitarioSvc.getDateFormat(
                        valor,
                        this.utilitarioSvc.FORMAT_DATE_FRONT
                    );
                }
                // valida que sea una fecha valida
                valor = row[column.name];
                // const d = new Date(valor);
                if (
                    this.utilitarioSvc.isValidDate(
                        valor,
                        this.utilitarioSvc.FORMAT_DATE_FRONT
                    ) === false
                ) {
                    this.utilitarioSvc.addWarningMessage(
                        'Fecha no válida ' +
                        '<strong>' +
                        valor +
                        '</strong> en la columna "' +
                        column.visualName.toUpperCase() +
                        '"'
                    );
                    return false;
                }
            }
        }
        return true;
    }

    private deleteData() {
        this.loading = true;
        this.utilitarioSvc.showSpinner();
        this.seguridadSvc
            .isDelete(
                this.table.tableName,
                this.table.primaryField,
                this.getValue(this.table.primaryField)
            )
            .subscribe(
                (resp) => {
                    const respuesta: any = resp;
                    this.utilitarioSvc.addMessageSuccess(
                        'El registro se elimino correctamente',
                        'Exito'
                    );
                    this.loading = false;
                    this.utilitarioSvc.hideSpinner();
                    this.update();
                },
                (err) => {
                    this.utilitarioSvc.addWarningMessage(
                        'El registro tiene relación con otras tablas del sistema',
                        'No se puede eliminar'
                    );
                    this.utilitarioSvc.hideSpinner();
                    this.loading = false;
                }
            );
    }

    /**
     * Asigna el valor padre
     */
    private setParentValue(parentValue): void {
        this.table.parentValue = parentValue;
    }

    /**
     * Asigna el foco a la tabla
     */
    private setFocus(): void {
        const elements: Element[] = Array.from(
            document.getElementsByName('dtTablaEditable')
        );
        for (const el of elements) {
            const numTabla = parseInt(el.getAttribute('dir'), 10);
            if (numTabla === this.table.tableNumber) {
                el.setAttribute('focus', 'true');
            } else {
                el.setAttribute('focus', 'false');
            }
        }
    }

    /**
     * Ejecuta el valor padre a consultar
     * @param parentValue
     */
    private executeParentValue(parentValue): void {
        this.table.parentValue = parentValue;
        this.consult();
    }

    /**
     * Actualiza los valores de las claves foraneas en las tablas relacionadas
     */
    private updateForaneaRelationships(valor): void {
        for (const relacion of this.relaciones) {
            for (const filaActual of relacion.getInserted()) {
                filaActual[relacion.table.foreignField] = valor;
            }
        }
    }

    /**
     * Valida la el dato de la columna
     * @param colActual
     * @param filaActual
     * @returns
     */
    private validateRow(colActual: ColumnCore, filaActual: any[]): any[] {
        // Recupera el valor a validad
        let valor = filaActual[colActual.name];
        if (this.utilitarioSvc.isUndefined(valor) === false) {
            filaActual[colActual.name] = null;
        }
        if (valor === '') {
            filaActual[colActual.name] = null;
        }
        valor = filaActual[colActual.name];
        if (this.utilitarioSvc.isUndefined(valor)) {
            if (typeof valor === 'object') {
                if (colActual.component === 'autocomplete') {
                    valor = valor.value;
                    filaActual[colActual.name] = valor;
                }
                if (colActual.component === 'imageAutocomplete') {
                    valor = valor.value;
                    filaActual[colActual.name] = valor;
                }
            }
        }
        return filaActual;
    }

    /**
     * Crea una fila, con los columnas de la tabla
     */
    private createRow(): void {
        // PK temporal negativa
        const tmpPK = 0 - (this.getInserted().length + 1);
        // console.warn('PK TEMPORAR >>> ', tmpPK);
        const filaNueva: any = {};
        for (const colActual of this.columns) {
            const nombre = colActual.name;
            const valorDefecto = colActual.defaultValue;
            filaNueva[nombre] = valorDefecto;
            // console.log(' <<< ', this.table.primaryField, tmpPK);
            if (nombre === this.table.primaryField) {
                filaNueva[nombre] = tmpPK;
            }
            // auditoria
            if (colActual.name === 'user_insert') {
                filaNueva[colActual.name] = this.utilitarioSvc.getUsername();
            }
            if (colActual.name === 'date_insert') {
                filaNueva[colActual.name] = this.utilitarioSvc.getDateCurrent(this.utilitarioSvc.FORMAT_DATE_BDD);
            }
            if (colActual.name === 'time_insert') {
                // console.log(this.utilitarioSvc.getCurrentTime());
                filaNueva[colActual.name] = this.utilitarioSvc.getCurrentTime();
            }


            // asigna los campos de empresa multinacional y sucursal
            if (colActual.name === 'ide_segcoor2') {
                colActual.visible = false;
                filaNueva[colActual.name] = this.utilitarioSvc.getMultinacional();
                colActual.read = true;
            } else if (colActual.name === 'ide_segdis2') {
                colActual.visible = false;
                filaNueva[colActual.name] = this.utilitarioSvc.getEmpresa();
                colActual.read = true;
            } else if (colActual.name === 'ide_seges2') {
                colActual.visible = false;
                filaNueva[colActual.name] = this.utilitarioSvc.getSucursal();
                colActual.read = true;
            }
        }
        // Asigna valor a las relaciones
        for (const relacion of this.relaciones) {
            relacion.setValueForeign(this.getValueSelected());
            relacion.clean();
        }
        // Asigna valor si tiene campoPadre
        if (this.utilitarioSvc.isUndefined(this.table.parentField)) {
            filaNueva[this.table.parentField] = this.table.parentValue;
        }

        filaNueva['insertada'] = true;
        this.data.unshift(filaNueva);
        this.selected = filaNueva;
    }

    /**
     * Valida si el valor de una columna es único
     * @param nombreTabla
     * @param columna
     * @param valor
     */
    private isValidateUnique(tableName: string, column: ColumnCore, value: any): Promise<boolean> {
        console.log(tableName, column, value, column.name);
        return new Promise((resolve) => {
            // Si es obj autocompletar
            if (typeof value === 'object') {
                value = value.value;
            }
            this.seguridadSvc.isUnique(tableName, column.name, value).subscribe(
                (resp) => {
                    const respuesta: any = resp;
                    this.loading = false;
                    if (respuesta.datos) {
                        this.utilitarioSvc.addWarningMessage(
                            'Restricción única, ya existe  un registro con el valor ' +
                            '<strong>' +
                            value +
                            '</strong> en la columna "' +
                            column.visualName.toUpperCase() +
                            '"'
                        );
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                },
                (err) => {
                    this.loading = false;
                    resolve(false);
                }
            );
        });
    }

    /**
     * Se ejecuta cuando selecciona un node del Arbol
     */
    private onSelectTree(): void {
        if (this.arbol.getValueSelected() !== this.table.parentValue) {
            this.selected = null;
            this.executeParentValue(this.arbol.getValueSelected());
        }
    }

    private setFieldForeign(fieldForeign: string): void {
        this.table.foreignField = fieldForeign.toLowerCase();
    }

    private setParentField(parentField: string): void {
        this.table.parentField = parentField.toLowerCase();
    }

    // Solo muestra un registro
    private setUnico() {
        this.table.numberRows = 1;
    }

    private guardarClick(): void {
        const botGuardar = document.getElementById('botGuardar');
        botGuardar.click();
    }

    private isRowInserted2(numberRow: number) {
        try {
            const insert = this.data[numberRow]['insertada'];
            if (this.utilitarioSvc.isUndefined(insert)) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    private setCurrentRow(numberRow: number) {
        const nuevaFila = this.data[numberRow];
        if (this.utilitarioSvc.isUndefined(nuevaFila)) {
            this.onSelect(nuevaFila);
        } else {
            this.utilitarioSvc.addErrorMessage(
                'No existe la fila ' + numberRow
            );
        }
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then((FileSaver) => {
            const EXCEL_TYPE =
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE,
            });
            FileSaver.default.saveAs(
                data,
                fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
            );
        });
    }

    /**
     * Retorna filas eliminadas
     */
    private getDeleted(): any[] {
        return this.eliminadas;
    }

}
