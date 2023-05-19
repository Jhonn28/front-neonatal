import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '../../../../@fuse/services/media-watcher/media-watcher.service';
import { Subject } from 'rxjs';
import { FuseNavigationItem } from '../../../../@fuse/components/navigation/navigation.types';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cu-cuenta',
  templateUrl: './cuenta.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuentaComponent implements OnInit {


  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  menuData: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  selectedPanel: string = 'account';
  title: string = 'Mi Perfil';
  panels: any[] = [];
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {

  }

  ngOnInit(): void {
    // Subscribe to media query change
    // Setup available panels
    this.panels = [
      {
        id: 'account',
        icon: 'heroicons_outline:user-circle',
        title: 'Cuenta',
        description: 'Gestiona tu perfil público y tu información privada'
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Seguridad',
        description: 'Gestiona tus preferencias de contraseña'
      },

    ];

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
     * Navigate to the panel
     *
     * @param panel
     */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.matDrawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
