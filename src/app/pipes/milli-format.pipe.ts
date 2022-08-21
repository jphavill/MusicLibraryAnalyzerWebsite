import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milliFormat'
})
export class MilliFormatPipe implements PipeTransform {

  transform(value: number): string {
    let seconds: number = Math.floor(((value / 1000) % 60));
    let minutes: number = Math.floor((value / (1000 * 60) % 60));
    let hours: number = Math.floor((value / (1000 * 60 * 60) % 24));
    let days: number = Math.floor((value / (1000 * 60 * 60 * 24)));

    return `${days} days, ${hours} hours, ${minutes} mins, ${seconds} secs`;
  }
}
