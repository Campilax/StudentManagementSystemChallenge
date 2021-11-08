import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import * as $ from 'jquery';
declare var jQuery: any;

@Injectable()
export class WidgetDataGridService {
  private className: any;
  private multiSelect: boolean = true;

  init(args: any) {
    if (args instanceof Object && Object.keys(args).length > 0) {
      this.className = 'name' in args ? args.name : '';
      this.multiSelect = 'multiSelect' in args ? args.multiSelect : '';
    } else {
      this.className = args;
    }
    return this;
  }

  itemSelect(args: any, event?: any) {
    const grid: any = $('.table.' + this.className);
    const item: any = grid.find('div[id="grid-item-' + args + '"]');
    const checkbox = item.find('input[type="checkbox"]');

    if (
      event.target.type !== 'checkbox' &&
      event.target.tagName.toLowerCase() !== 'label'
    ) {
      // clear previously selected items
      const items: any = grid.find('tbody').find('div.grid-item');
      items.map((index: any, item: any) => {
        item.classList.remove('alert-nc-primary');
        item.classList.remove('text-white');
        const itemCheckbox = item.querySelector(
          'input[type="checkbox"], input[type="radio"]'
        );
        itemCheckbox.checked = false;
      });

      // select item
      item.addClass('alert-nc-primary');

      if (checkbox.is(':checked')) {
        const numberOfSelectedRows = [];
        items.map((index: any, item: any) => {
          const itemCheckbox = item.querySelector(
            'input[type="checkbox"], input[type="radio"]'
          );
          if (itemCheckbox.checked) {
            numberOfSelectedRows.push(itemCheckbox.value);
          }
        });

        if (numberOfSelectedRows.length > 1) {
          checkbox.prop('checked', false);
        } else {
          //
        }
      } else {
        checkbox.prop('checked', true);
      }
    } else {
      if (event.target.checked) {
        item.addClass('alert-nc-primary text-white');
      } else {
        item.removeClass('alert-nc-primary');
        item.removeClass('text-white');
      }
    }
  }

  multiItemSelect(args: any, event?: any) {
    const item: any = $('.table.' + this.className).find(
      'tr[id="datagrid-item-' + args + '"]'
    );
    const checkbox = item.find('input[type="checkbox"]');

    if (
      event.target.type !== 'checkbox' &&
      event.target.tagName.toLowerCase() !== 'label'
    ) {
      // clear previously selected items
      const items: any = $('.table.' + this.className)
        .find('tbody')
        .find('tr');
      // tslint:disable-next-line: no-shadowed-variable

      //
      if (checkbox.is(':checked')) {
        const numberOfSelectedRows = [];
        // tslint:disable-next-line: no-shadowed-variable
        items.map((index: any, item: any) => {
          const itemCheckbox = item.querySelector(
            'input[type="checkbox"], input[type="radio"]'
          );
          if (itemCheckbox.checked) {
            numberOfSelectedRows.push(itemCheckbox.value);
          }
        });

        //
        if (numberOfSelectedRows.length > 1) {
          checkbox.prop('checked', false);
        } else {
          //
        }

        item.removeClass('alert-nc-primary');
        item.removeClass('text-white');
      } else {
        checkbox.prop('checked', true);

        // select item
        item.addClass('alert-nc-primary text-white');
      }
    }
  }

  getSelectedItemValue() {
    const selectedItems: any = [];
    const grid: any = $('.table.' + this.className);
    const items: any = grid.find('tbody').find('div.grid-item');
    items.map((index: any, item: any) => {
      const checkbox = item.querySelector(
        'input[type="checkbox"], input[type="radio"]'
      );
      if (checkbox.checked) {
        selectedItems.push(checkbox.value);
      }
    });
    return selectedItems;
  }
}
