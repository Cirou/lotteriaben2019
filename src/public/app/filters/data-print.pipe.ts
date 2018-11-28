import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPrint'
})
export class DataPrintPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
