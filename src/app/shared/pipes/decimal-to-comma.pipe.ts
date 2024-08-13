import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalToComma',
  standalone: false,
})
export class DecimalToCommaPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'number') return value.toString().replace('.', ',');
    if (typeof value === 'string') return value.replace('.', ',');
    return value;
  }

}
