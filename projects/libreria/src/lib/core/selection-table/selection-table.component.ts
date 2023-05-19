import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColumnCore, TableCore } from '../../class';
import { MethodsService } from '../../services/methods.service';
import { SecurityService } from '../../services/security.service';

@Component({
    selector: 'cmp-selection-table',
    templateUrl: './selection-table.component.html',
    styleUrls: []
})
export class SelectionTableComponent implements OnInit {

    display: boolean = false;
    products: [];
    width = '750px';
    selectedProducts3: [];
    selectedProduct3: [];
    table: TableCore;
    isDraw = false;
    loading = false;
    title: string ='Titulo';
    selectionMode: 'single' | 'multiple' = 'single';
    rows = [];

    // Servicio
    private metodoServicio: string;
    private parametrosServicio: any;
    //Eventos
    onClickAcept?: (event?: any) => void;
    onClickCancel?: (event?: any) => void;

    constructor(private _segurityService: SecurityService, private cdRef: ChangeDetectorRef) {
        this.table = new TableCore();
        this.isDraw = false;
    }

    ngOnInit(): void {
        this.cdRef.detectChanges();

    }

    showDialog() {
        this.display = true;
    }

    setSize(size: 'sm' | 'lg' | 'xl') {
        if (size == 'sm') {
            this.width = '300px';
        } else if (size == 'lg') {
            this.width = '800px';
        } else if (size == 'xl') {
            this.width = '1140px';
        }
    }

    setTableSelectionService(service: string, parameters: {}, fieldPrimary: string, columns: string) {
        this.table.tableNumber = 1;
        this.metodoServicio = service;
        this.parametrosServicio = parameters;
        this.table.primaryField = fieldPrimary.toLowerCase();
        this.table.columns = new Array<ColumnCore>();
        this.table.data = [];
        const datos = columns.split(',');
        return new Promise((resolve) => {
            for (const colActual of datos) {
                const col: ColumnCore = new ColumnCore();
                col.visible = true;
                if (colActual === this.table.primaryField) {
                    //Oculta y hace lectura campo primario x defecto
                    col.visible = false;
                    col.width = 7;
                }
                col.name = colActual;
                col.visualName = colActual;
                //col.order = colActual.orden;
                //col.width = colActual.anchocolumna;
                //col.type = colActual.tipo;
                col.read = true;
                //col.component = colActual.componente;
                //col.comment = colActual.comentario;
                //col.uppercase = colActual.mayusculas;
                this.table.columns.push(col);
            }
            console.log('COLUMNA>>>', this.table.columns);
            resolve(this.table.columns);
            this.isDraw = true;
        });

    }

    show() {
        this._segurityService.getConsultSelectTable(this.metodoServicio)
            .subscribe(
                (resp) => {
                    this.table.data = resp;
                    this.display = true;
                }
            );
    }

    onAcept(event) {
        this.loading = true;
        if (this.onClickAcept) {
            this.onClickAcept({
                originalEvent: event
            });
        }
    }

    /**
     * Close modal
     */
    hide(event?) {
        console.log('click en cerrar modal');
        this.display = false;
        if (this.onClickCancel) {
            this.onClickCancel({
                originalEvent: event
            });
        }
    }

    setTitle(title: string){
        this.title = title;
    }

    setRadio(){
        this.selectionMode = 'single';
        //console.log('entro a radio');
    }
    onRowSelect(event){

        console.log('marco',event.data);
        this.rows.push(event.data['value']);
        console.log('array>>>',this.rows);
    }
    onRowUnselect(event){
        for(let i=0;i<this.rows.length;i++){
            if(this.rows[i] === event.data['value']){
                this.rows.splice(i,1);
            }
        }
        console.log('array nuevo',this.rows);
    }


}
