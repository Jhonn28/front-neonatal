import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterDropdown'
})
export class ConverterDropdownPipe implements PipeTransform {

  transform(valor, listaCombo): any {
    // console.log('pipe >>> ', valor, listaCombo);
    if (listaCombo.length > 0 && valor !== null) {
      const obj = listaCombo.find(x => x.value === valor);
      return obj.label;
    }
    return valor;
  }

}
