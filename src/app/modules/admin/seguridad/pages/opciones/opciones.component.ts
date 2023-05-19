import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BarMenu, TableCoreComponent, TreeCoreComponent, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'seg-opciones',
  templateUrl: './opciones.component.html',
  styles: [
  ]
})
export class OpcionesComponent extends BarMenu implements OnInit {

  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild('treTree', { static: true }) treTree: TreeCoreComponent;
  @ViewChild('tabTable1', { static: false }) tabTable1: TableCoreComponent;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _utilService: UtilsService
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    this.treTree.setTree('seg_opcion', 'ide_segopc', 'nombre_segopc', 'seg_ide_segopc');
    this.treTree.setTitulo('OPCIONES');
    //this.treTree.setHeight('450px');
    this.treTree.dibujar();

    await this.tabTable1.setTable('seg_opcion', 'ide_segopc', 1);
    this.tabTable1.setTitle('OPCIONES')
    this.tabTable1.getColumn('ide_segopc').setVisualName('código');
    this.tabTable1.getColumn('nombre_segopc').setVisualName('nombre');
    this.tabTable1.getColumn('ruta_segopc').setVisualName('ruta');
    this.tabTable1.getColumn('icono_segopc').setVisualName('icono');
    this.tabTable1.getColumn('icono_segopc').setIcono();//'assets/json/font-aweson.json'
    this.tabTable1.getColumn('auditoria_segopc').setVisible(false);
    this.tabTable1.addTree(this.treTree);
    this.tabTable1.setRows(15);
    this.tabTable1.setHeight('flex');
    this.tabTable1.draw();
  }


  ngOnInit(): void {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('md')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  insert(): void {
    if (this.tabTable1.isFocus()) {
      this.tabTable1.insert();
    }
  }

  async save(): Promise<void> {
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
