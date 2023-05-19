import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Condition } from '../../interfaces/condition';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'cmp-dropdown',
  templateUrl: './dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownCoreComponent implements OnInit {

  listaCombo: any[] = [];
  valor: any;
  @Input() lectura = false;
  @Input() label: string;
  @Input() nullCombo = true;
  @Input() width = '250px'; // defecto
  invalid = false;
  // Eventos
  onChange?: (event?: any) => void;

  constructor(
    private cdRef: ChangeDetectorRef,
    private seguridadSvc: SecurityService) {
  }

  ngOnInit(): void { }

  public changeEvent(): void {
    this.invalid = false;
    // Ejecuta callback method
    if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }

  }

  setInvalid(invalid: boolean): void {
    this.invalid = invalid;
    const dr = document.querySelector('p-dropdown');
    if (invalid) {
      dr.classList.add('ng-invalid');
      dr.classList.add('ng-dirty');
    }
    else {
      dr.classList.remove('ng-invalid');
      dr.classList.remove('ng-dirty');
    }

  }

  setLabel(label: string): void {
    this.label = label;
  }

  setDropdown(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: Condition[]): void {
    // console.log('combo mando a llamar ', nombreTabla);
    this.seguridadSvc.getDropdownTable(nombreTabla, campoPrimario, campoNombre, condicion)
      .subscribe(resp => {
        // console.log('combo', resp);
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
          if (this.nullCombo) {
            // Agrega null a opcion
            this.listaCombo.unshift({ value: null, label: '  ' });
          }
        }
        this.cdRef.detectChanges();
      });
  }

  /**
     * Genera la columna en combo o lista despegable mediante un servicio rest o endpoint
     * @param servicio endpoint o servicio rest
     */
  async setDropdownService(servicio: string, parametros?: any): Promise<void> {
    this.listaCombo = [];
    this.seguridadSvc.getDropdownService(servicio, parametros).subscribe(resp => {
      const respuest: any = resp;
      // console.log(resp);
      if (resp.data) {
        this.listaCombo = respuest.data;
        console.log('datos=>', this.listaCombo);
        if (this.nullCombo) {
          // Agrega null a opcion
          this.listaCombo.unshift({ value: -1, label: 'Seleccionar ...' });
        }
      }
      this.cdRef.detectChanges();
    });
  }

  setDropdownObject(object: any): void {
    this.listaCombo = object;
    this.cdRef.detectChanges();
    // object.unshift({ value: null, label: 'Seleccionar ...' });
  }

  mostrarNull(nullCombo: boolean): void {
    this.nullCombo = nullCombo;
  }

  setRead(lectura: boolean): void {
    this.lectura = lectura;
  }

  /**
   * Limpia el combo los datos
   */
  clean() {
    this.valor = null;
    this.listaCombo = [];
  }

  getValue(): void {
    return this.valor;
  }

  async getSelect(): Promise<any> {
   return await this.listaCombo.find(data => data.value === this.valor);
  }

  selected(event) {
    console.log(event);
  }

  /**
   * Selecciona por defecto el primer valor
   */
  setSelectIndex() {
    if (this.listaCombo.length > 0) {
      this.valor = this.listaCombo[0].value;
    }
  }

}
