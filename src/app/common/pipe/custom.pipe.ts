import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalisePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    const capitalStart = value
      .split('-')
      .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`);
    return capitalStart.join(' ');
  }
}
