import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trimHtml'
})
export class TrimHtmlPipe implements PipeTransform {

  transform(value: string): any {
    if (value.length > 15) {
      return value.substring(0, 15) + '..';
    } else {
      return value;
    }
  }

}
