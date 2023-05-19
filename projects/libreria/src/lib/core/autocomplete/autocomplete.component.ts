import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'cmp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: []
})
export class AutocompleteCoreComponent implements OnInit {

  public resultadoAutocompletar: any[];

  private listaCombo: any = [];
  valor: any;
  @Input() width = '250px'; // defecto
  @Input() lectura = false;
  @Input() label: string;

  servicio: string;
  condicion: any;

  invalid = false;
  ejecutar = true;
  // Eventos
  onChange?: (event?: any) => void;

  constructor(
    private utilitarioSvc: UtilsService,
    private seguridadSvc: SecurityService) {
    // this.lectura = true;
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

  public borrarEvent(): void {
    this.invalid = false;
    this.valor = null;
    // Ejecuta callback method
    if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }
  }

  setInvalid(invalid: boolean): void {
    this.invalid = invalid;

    const dr = document.querySelector('p-autocomplete');
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

  setexecute(ejecuta: boolean) {
    this.ejecutar = ejecuta;
  }

  /* setAutocompletar(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string): void {
    this.seguridadSvc.getComboTabla(nombreTabla, campoPrimario,
      campoNombre, condicion).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
          this.lectura = false;
        }
      });
  } */

  setAutocompleteService(servicio: string, condicion?: string): void {
    this.condicion = condicion;
    this.servicio = servicio;
    if (this.ejecutar) {
      this.seguridadSvc.getAutocompleteService(servicio, condicion).subscribe(resp => {
        if (resp) {
          this.listaCombo = resp;
        }
        // console.log(this.listaCombo);
      });
    }

    /*this.seguridadSvc.getComboTabla(nombreTabla, campoPrimario,
      campoNombre, condicion).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
        }
      });*/
  }

  setLectura(lectura: boolean): void {
    this.lectura = lectura;
  }


  getValue(): void {
    if (this.utilitarioSvc.isUndefined(this.valor)) {
      return this.valor.value;
    }
    return null;
  }

  getValueLabel(): void {
    if (this.utilitarioSvc.isUndefined(this.valor)) {
      return this.valor.label;
    }
    return null;
  }

  /**
   * Se ejecuta al escribir en el autocompletar
   */
  async onAutocomplete(event): Promise<void> {
    if (this.ejecutar) {
      if (event.query) {
        this.resultadoAutocompletar = await this.listaCombo.filter(fila => fila.label.search(event.query) !== -1);
      }
    } else {
      this.seguridadSvc.getAutocompleteService(this.servicio, this.condicion).subscribe(resp => {
        if (resp) {
          //console.log(resp);
          this.resultadoAutocompletar = resp.data;
        }
        // console.log(this.listaCombo);
      });
    }



    // console.log(this.resultadoAutocompletar);
  }

}
