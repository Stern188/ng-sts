import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'items'
})
export class ItemsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let a = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        a.push({key: key, value: value[key]});
      }
    }
    return a;
  }

}
