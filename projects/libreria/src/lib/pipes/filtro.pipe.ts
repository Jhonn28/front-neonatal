import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, page: number = 0): any {
    return value.slice(page, page + 45);
    //return null;
  }

}
