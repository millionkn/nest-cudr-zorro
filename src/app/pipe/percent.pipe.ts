import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: number | null, digits: number): number {
    if (value === null) {
      return 0;
    }
    return Number((Number(value) * 100).toFixed(digits));
  }

}
