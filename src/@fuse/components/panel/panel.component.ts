import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { FuseNavigationItem } from '../navigation';
import { FusePanelItem } from './panel.interface';

@Component({
    selector: 'fuse-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class FusePanelComponent implements OnInit {

    @Input() navigation: FuseNavigationItem[];
    @Input() title : string ='Titulo';
    
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService) { }

    ngOnInit(): void {
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('md') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
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
     ngOnDestroy(): void
     {
         // Unsubscribe from all subscriptions
         this._unsubscribeAll.next(null);
         this._unsubscribeAll.complete();
     }
 
     /**
      * Toggle the drawer
      */
      toggleDrawer(): void
      {
          // Toggle the drawer
          this.matDrawer.toggle();
      }

}
