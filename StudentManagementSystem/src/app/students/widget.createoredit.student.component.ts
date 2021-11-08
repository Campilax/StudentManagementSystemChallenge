import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { WidgetToastService } from '../shared/widgets/toast/widget.toast.service';
import { WidgetDataTableService } from '../shared/widgets/data/widget.table.service';
import { GlobalService } from '../shared/services/global.service';
import { StateManagementService } from '../shared/services/state.management.service';
import { PaginationTypeEnum } from '../shared/enums/pagination.type.enum';
import { StudentService } from './student.service';
import { FormValidationService } from '../shared/services/form.validation.service';
import { WidgetLoaderService } from '../shared/widgets/loader/widget.loader.service';

@Component({
  selector: 'widget-createoredit-student-component',
  templateUrl: 'widget.createoredit.student.component.html',
  styleUrls: ['widget.createoredit.student.component.css'],
})
export class WidgetCreateOrEditStudentComponent implements OnInit {
  @Output() widgetOkayButtonClick = new EventEmitter();

  public inProgress = false;
  public isEmpty = false;
  public isError = false;
  public isFormReady = false;
  public isSaving = false;
  public isNew = false;
  public errorMessage!: string;
  public passedParam: any;
  public data: any = {};

  public searchData: any = {};

  private callback: any;

  constructor(
    public studentService: StudentService,
    public toastr: WidgetToastService,
    public dataTable: WidgetDataTableService,
    public stateManager: StateManagementService,
    public globals: GlobalService,
    public formValidator: FormValidationService,
    public loaderService: WidgetLoaderService,
  ) {
    this.studentService.createOrEditDialog.subscribe((params) =>
      this.showDialog(params)
    );
  }

  ngOnInit() {
    $(() => {
      document
        .getElementById('student-details')
        .querySelectorAll('input, textarea')
        .forEach((field: any, index: number) => {
          field.addEventListener('change', (event: any) => {
            this.validateDetailsFormUpdate(event);
          });
          field.addEventListener('blur', (event: any) => {
            event.target.classList.remove('is-invalid');
            if (event.target.value.trim() == '') {
              event.target.classList.add('is-invalid');
              event.target.focus();
            }
            this.validateDetailsFormUpdate(event);
          });
          field.addEventListener('keydown', (event: any) => {
            this.validateDetailsFormUpdate(event);
          });
          field.addEventListener('keyup', (event: any) => {
            this.validateDetailsFormUpdate(event);
          });
        });
    });
  }

  showDialog(params: any) {
    this.inProgress = false;
    this.isEmpty = false;
    this.isError = false;
    this.isFormReady = false;
    this.isSaving = false;
    this.isNew = false;
    this.errorMessage = "";
    this.passedParam = null;

    if (params.data) {
      this.data = params.data.response || params.data;
    } else {
      this.data = {};
      this.isNew = true;

      // clear previous error message
      document
        .getElementById('student-details')
        .querySelectorAll('input')[0]
        .classList.remove('is-invalid');

      // set focus
      setTimeout(() => {
        document
          .getElementById('student-details')
          .querySelectorAll('input')[0]
          .focus();
      });
    }

    if (params.callback) {
      this.callback = params.callback;
    }
    ($('#createoredit-student-modal') as any).modal('show');
  }

  hideDialog() {
    ($('#createoredit-student-modal') as any).modal('hide');
  }

  saveChanges(): void {
    this.isSaving = true;
    const test = this.formValidator.performTest(
      $('#createoredit-student-form')
    );

    // enable loader
    this.inProgress = true;
    this.loaderService.show();

    if (this.isNew) {
      this.studentService.save(this.data).then(
        (response: any) => {
          this.isSaving = false;
          this.hideDialog();
          // this.toastr.show({
          //   title: 'Done!',
          //   label: 'Created successfully.'
          // });

          // callback
          if (this.callback) {
            this.callback();
          }
        },
        (error: any) => {
          this.isSaving = false;
          // this.toastr.show({
          //   title: 'Oops!',
          //   label: 'Something went wrong, please try again later.'
          // });
        }
      );
    } else {
      this.studentService.update(this.data).then(
        (response: any) => {
          this.isSaving = false;
          this.hideDialog();
          // this.toastr.show({
          //   title: 'Done!',
          //   label: 'Changes were made successfully.'
          // });

          // callback
          if (this.callback) {
            this.callback();
          }
        },
        (error: any) => {
          this.isSaving = false;
          // this.toastr.show({
          //   title: 'Oops!',
          //   label: 'Something went wrong, please try again later.'
          // });
        }
      );
    }
  }

  enableContinueButton(event?: any): void {
    const test = this.formValidator.validateForm(
      $('#createoredit-user-form')
    );

    if (test.isSuccessful) {
      this.isFormReady = true;
    } else {
      this.isFormReady = false;
    }
  }

  validateDetailsFormUpdate(event?: any): void {
    //
  }

}
