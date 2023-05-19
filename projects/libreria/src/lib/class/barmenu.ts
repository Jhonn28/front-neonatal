import { AfterViewChecked, ViewChild, Component } from '@angular/core';
import { MenuBarComponent } from '../core';

@Component({
    selector: 'app-barmenu',
    template: '',
  })

export abstract class BarMenu implements AfterViewChecked {

    // @ViewChild('barBotones', { static: false }) barBotones: BreadcrumbsComponent;
    @ViewChild('barButtons') barButtons: MenuBarComponent;

    ngAfterViewChecked(): void {
        if (this.barButtons !== undefined) {
            this.barButtons.onInsert = () => { this.insert(); };
            this.barButtons.onDelete = () => { this.delete(); };
            this.barButtons.onSave = () => { this.save(); };
        }
    }

    /**
     * Ejecuta este método cuando se da click en el boton insertar
     */
    abstract insert(): void;

    /**
     * Ejecuta este método cuando se da click en el boton guardar
     */
    abstract save(): void;

    /**
     * Ejecuta este método cuando se da click en el boton eliminar
     */
    abstract delete(): void;

}
