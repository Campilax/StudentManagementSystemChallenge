import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';

@Pipe({
  name: 'NairaCurrency',
})
export class NairaCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any, args?: any): any {
    value = parseInt((value || 0).toString().split(',').join(''));
    value = isNaN(value)? 0 : value;

    return _.isNumber(value)
      ? this.decimalPipe.transform(value, args)
      : 0;
  }
}
