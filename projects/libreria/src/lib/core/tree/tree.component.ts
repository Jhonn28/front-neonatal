import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { Condition } from '../../interfaces';
import { SecurityService } from '../../services/security.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'cmp-tree',
  templateUrl: './tree.component.html',
  styleUrls: []
})
export class TreeCoreComponent implements OnInit {

  @ViewChild('tree', { static: false }) tree: Tree;

  items: MenuItem[];
  data: TreeNode[];
  selected: any;
  height = 'flex';
  isSelect = false;
  title = 'RAIZ';

  tableName: string;
  primaryField: string;
  fieldName: string;
  fieldParent: string;
  fieldOrder: string;
  conditions: Condition;
  isDraw = false; // Sirve para controlar si se ejecuto el metodo consultar
  loading = false;
  // Eventos
  onSelect?: (event?: any) => void;

  constructor(
    private cdRef: ChangeDetectorRef,
    private _securityService: SecurityService,
    private _utilService: UtilsService
  ) {
    this.data = [];
    this.selected = null;
    this.isDraw = false;
    this.tableName = null;
    this.primaryField = null;
    this.fieldName = null;
    this.fieldParent = null;
    this.fieldOrder = null;
    this.conditions = null;
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Ampliar todo', icon: 'pi pi-search', command: (event) => this.expandAll() },
      { label: 'Contraer todo', icon: 'pi pi-times', command: (event) => this.collapseAll() }
    ];
  }

  setTree(nombreTabla: string, campoPrimario: string, campoNombre: string, campoPadre: string): void {
    this.tableName = nombreTabla;
    this.primaryField = campoPrimario;
    this.fieldName = campoNombre;
    this.fieldParent = campoPadre;
    this.fieldOrder = campoNombre;
  }

  setTitulo(titulo: string): void {
    this.title = titulo.toUpperCase();
  }

  setCampoOrden(campoOrden: string): void {
    this.fieldOrder = campoOrden;
  }

  setCondiciones(conditions: Condition): void {
    this.conditions = conditions;
  }

  async dibujar(): Promise<void> {
    await this.consultar();
    this.isDraw = true;
    this.cdRef.detectChanges();
  }

  private async consultar(): Promise<void> {
    this.loading = true;
    this.data = [];
    const condicionesArbol: Condition[] = [];
    if (this._utilService.isUndefined(this.conditions)) {
      condicionesArbol.push(this.conditions);
    }

    const raiz = {
      label: this.title,
      data: null,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    };
    this.data.push(raiz);
    // console.log('condicion arbol > ', condicionesArbol);
    await this._securityService.getConsultTree(this.tableName, this.primaryField, this.fieldName, this.fieldParent,
      this.fieldOrder, condicionesArbol).subscribe(resp => {
        //console.log(resp);
        const respuest: any = resp;
        if (respuest.data) {
          // Nodo raiz
          raiz['children'] = respuest.data;
          // selecciona el primer elemento
          this.selected = this.data[0];
          this.selected.expanded = true;
        }
        this.loading = false;
      }, (err) => { this.loading = false });

  }

  getValueSelected(): number {
    return this.selected.data;
  }


  nodeSelect(event): void {
    this.selected.expanded = !this.selected.expanded;
    this.isSelect = true;
    if (this.onSelect) {
      this.onSelect({
        originalEvent: event
      });
    }
  }

  executeTree() {
    this.consultar();
  }

  expandAll() {
    this.data.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.data.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  /**
     * height table
     * Flex = auto height
     * default = 200px
     */
  setHeight(height: string) {
    this.height = height;
  }

}
