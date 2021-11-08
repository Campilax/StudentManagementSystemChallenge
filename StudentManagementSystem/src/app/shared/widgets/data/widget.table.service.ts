import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import * as $ from 'jquery';
declare var jQuery: any;

@Injectable()
export class WidgetDataTableService {
  private className: any;

  init(args: any) {
    if (args instanceof Object && Object.keys(args).length > 0) {
      this.className = 'name' in args ? args.name : '';
    } else {
      this.className = args;
    }
    return this;
  }

  datagridRowSelect(args: any, event?: any) {
    const row: any = $('.table.' + this.className).find(
      'tr[id="datagrid-row-' + args + '"]'
    );
    const checkbox = row.find('input[type="checkbox"]');

    if (
      event.target.type !== 'checkbox' &&
      event.target.tagName.toLowerCase() !== 'label'
    ) {
      // clear previously selected rows
      const rows: any = $('.table.' + this.className)
        .find('tbody')
        .find('tr');
      // tslint:disable-next-line: no-shadowed-variable
      rows.map((index: any, row: any) => {
        row.classList.remove('alert-nc-primary');
        row.classList.remove('text-white');
        row.classList.remove('selected');
        const rowCheckbox = row.querySelector(
          'input[type="checkbox"], input[type="radio"]'
        );
        if (rowCheckbox) {
          rowCheckbox.checked = false;
        }
      });

      // select row
      row.addClass('alert-nc-primary text-white selected');

      //
      if (checkbox.is(':checked')) {
        const numberOfSelectedRows = [];
        // tslint:disable-next-line: no-shadowed-variable
        rows.map((index: any, row: any) => {
          const rowCheckbox = row.querySelector(
            'input[type="checkbox"], input[type="radio"]'
          );
          if (rowCheckbox.checked) {
            numberOfSelectedRows.push(rowCheckbox.value);
          }
        });

        //
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
        // select row
        row.addClass('alert-nc-primary text-white');
      } else {
        // deselect row
        row.removeClass('alert-nc-primary');
        row.removeClass('text-white');
      }
    }
  }

  datagridMultiRowSelect(args: any, event?: any) {
    const row: any = $('.table.' + this.className).find(
      'tr[id="datagrid-row-' + args + '"]'
    );
    const checkbox = row.find('input[type="checkbox"]');

    if (
      event.target.type !== 'checkbox' &&
      event.target.tagName.toLowerCase() !== 'label'
    ) {
      // clear previously selected rows
      const rows: any = $('.table.' + this.className)
        .find('tbody')
        .find('tr');
      // tslint:disable-next-line: no-shadowed-variable

      if (checkbox.is(':checked')) {
        const numberOfSelectedRows = [];
        // tslint:disable-next-line: no-shadowed-variable
        rows.map((index: any, row: any) => {
          const rowCheckbox = row.querySelector(
            'input[type="checkbox"], input[type="radio"]'
          );
          if (rowCheckbox && rowCheckbox.checked) {
            numberOfSelectedRows.push(rowCheckbox.value);
          }
        });

        //
        // if (numberOfSelectedRows.length > 1) {
        checkbox.prop('checked', false);
        // } else {
        //
        // }

        row.removeClass('alert-nc-primary');
        row.removeClass('text-white');
      } else {
        checkbox.prop('checked', true);
        row.addClass('alert-nc-primary text-white');
      }
    }
  }

  datagridSingleRowSelect(args: any, event?: any) {
    const row: any = $('.table.' + this.className).find(
      'tr[id="datagrid-row-' + args + '"]'
    );
    const checkbox = row.find('input[type="checkbox"]');

    if (row) {
      if (
        event.target.type !== 'checkbox' &&
        event.target.tagName.toLowerCase() !== 'label'
      ) {
        // clear previously selected rows
        const rows: any = $('.table.' + this.className)
          .find('tbody')
          .find('tr');
        // tslint:disable-next-line: no-shadowed-variable
        rows.map((index: any, row: any) => {
          row.classList.remove('alert-nc-primary');
          row.classList.remove('text-white');
          row.classList.remove('selected');
          const rowCheckbox = row.querySelector(
            'input[type="checkbox"], input[type="radio"]'
          );
          rowCheckbox.checked = false;
        });

        // select row
        row.addClass('alert-nc-primary text-white selected');

        //
        if (checkbox.is(':checked')) {
          const numberOfSelectedRows = [];
          // tslint:disable-next-line: no-shadowed-variable
          rows.map((index: any, row: any) => {
            const rowCheckbox = row.querySelector(
              'input[type="checkbox"], input[type="radio"]'
            );
            if (rowCheckbox.checked) {
              numberOfSelectedRows.push(rowCheckbox.value);
            }
          });

          //
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
          // select row
          row.addClass('alert-nc-primary text-white');
        } else {
          // deselect row
          row.removeClass('alert-nc-primary');
          row.removeClass('text-white');
        }
      }
    }
  }

  getSelectedDatagridRowValue() {
    const selectedProducts: any = [];
    $('.table.' + this.className)
      .find('tbody')
      .find('tr')
      .map((index: any, row: any) => {
        const checkbox = row.querySelector(
          'input[type="checkbox"], input[type="radio"]'
        );
        if (checkbox && checkbox.checked) {
          selectedProducts.push(checkbox.value);
        } else {
          if (row.classList.contains('selected')) {
            selectedProducts.push(row.getAttribute('data-id'));
          }
        }
      });
    return selectedProducts;
  }
}
