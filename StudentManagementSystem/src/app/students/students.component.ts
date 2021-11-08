import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import * as $ from 'jquery';
import { GlobalService } from '../shared/services/global.service';
import { WidgetPageLoaderService } from '../shared/widgets/loader/widget.page.loader.service';
import { WidgetConfirmDialogService } from '../shared/widgets/confirm.dialog/widget.confirm.dialog.service';
import { WidgetAlertDialogService } from '../shared/widgets/alert.dialog/widget.alert.dialog.service';
import { WidgetToastService } from '../shared/widgets/toast/widget.toast.service';
import { WidgetDataTableService } from '../shared/widgets/data/widget.table.service';
import { PaginationTypeEnum } from '../shared/enums/pagination.type.enum';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  public url = new URL(decodeURIComponent(window.location.href));
  public urlParameters: any = this.url.pathname.substring(1).split('/');

  public students: Array<any> = [];
  public student: any = {};
  public request: any = {};
  public currentPage: any = 0;

  public PaginationTypeEnum = PaginationTypeEnum;

  public inProgress: boolean = false;

  constructor(
    public globals: GlobalService,
    public router: Router,

    // shared widgets
    public pageLoader: WidgetPageLoaderService,
    public confirmationDialog: WidgetConfirmDialogService,
    public notificationDialog: WidgetAlertDialogService,
    public toastr: WidgetToastService,
    public dataTable: WidgetDataTableService,
    public studentService: StudentService
  ) {
    this.globals.isLoading = false;
    this.globals.isAccountLoggedIn = true;

    if (this.urlParameters.length > 0) {
      this.globals.selectedLoggedInAccountPageTab = this.urlParameters[0];
    }
  }

  ngOnInit() {
    $(() => {
      // enable tooltips
      ($('[data-toggle="tooltip"]') as any).tooltip();
    });

    this.getAll();
  }

  datagridRowSelect(args: any, event?: any) {
    this.dataTable
      .init({
        name: 'students-table',
      })
      .datagridRowSelect(args, event);
  }

  getAll(pageNumber: number = 1) {
    this.inProgress = true;

    this.request.PageNumber = pageNumber ? pageNumber : 1;
    this.request.RowsPerPage = this.request.rowsPerPage || 5;
    this.currentPage = pageNumber;

    return this.studentService.getAll(this.request).then(
      (response: any) => {
        this.students = response.data;
        this.request = response.page;
        this.inProgress = false;
      },
      (error: any) => {
        this.inProgress = false;

        this.toastr.show({
          title: "Oops!",
          label: "Something went wrong, please try again."
        });
      }
    );
  }

  searchOnClick(event?: any) {
    this.getAll();
  }

  searchOnEnter(event?: any) {
    if (event.keyCode === 13) {
      this.getAll();
    }
  }

  create(event?: any) {
    this.pageLoader.setLabel('Loading, please wait...');
    this.pageLoader.show();
    this.studentService.showDialog(null, () => {
      this.toastr.show({
        title: "Done!",
        label: "Student profile created successfully."
      });
      this.getAll()
    });
  }

  edit(event?: any) {
    const selectedRows: any = this.dataTable.init({
      name: 'students-table',
    }).getSelectedDatagridRowValue();
    if (selectedRows.length > 1) {
      // tell me to select a single student
      this.notificationDialog.setLabel('Please select a student to continue.');
      this.notificationDialog.show();
    } else {
      if (selectedRows.length <= 0) {
        // tell me to select a student
        this.notificationDialog.setLabel(
          'Please select a student to continue.'
        );
        this.notificationDialog.show();
      } else {
        const selectedStudentId = selectedRows[0];

        this.pageLoader.setLabel('Loading, please wait...');
        this.pageLoader.show();
        this.studentService.get(selectedStudentId).then(
          (response: any) => {
            this.pageLoader.hide();
            this.studentService.showDialog(response, () => {
              this.toastr.show({
                title: "Done!",
                label: "Student profile updated successfully."
              });
              this.getAll();
            });
          },
          (error: any) => {
            this.pageLoader.hide();
            this.toastr.show({
              title: 'Oops!',
              label: 'Something went wrong, please try again later.',
            });
          }
        );
      }
    }
  }

  editSelected(event: any) {
    this.edit(event);
    event.cancelBubble = true;
    event.preventDefault();
  }

  delete(event?: any) {
    const selectedRows: any = this.dataTable.init({
      name: 'students-table',
    }).getSelectedDatagridRowValue();
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      // tslint:disable-next-line: max-line-length
      this.confirmationDialog.setLabel(
        'Are you sure you want to delete ' +
        (selectedRows.length > 1 ? 'these students' : 'this student') +
        '? (Y/N)'
      );
      this.confirmationDialog.setOkayButtonLabel('Yes, continue');
      this.confirmationDialog.addEventHandler(() => {
        this.pageLoader.setLabel('Deleting, please wait...');
        this.pageLoader.show();
        this.studentService.delete(selectedRows).then(
          (response: any) => {
            this.pageLoader.hide();
            this.getAll();
            this.toastr.show({
              title: 'Done!',
              label:
                (selectedRows.length > 1 ? 'Students' : 'Student') +
                ' deleted successfully',
            });
          },
          (error: any) => {
            this.pageLoader.hide();
            this.toastr.show({
              title: 'Oops!',
              label: 'Something went wrong, please try again later.',
            });
          }
        );
      });
      this.confirmationDialog.show();
    } else {
      this.notificationDialog.setLabel(
        'Please select the student you want removed.'
      );
      this.notificationDialog.show();
    }
  }

  deleteSelected(event: any) {
    this.delete(event);
    event.cancelBubble = true;
    event.preventDefault();
  }

  download(event?: any) {
    this.studentService.downloadFileAsCSV().then(
      (response: any) => {
        // this.pageLoader.hide();
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(response);
        a.download = "filename.csv";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      },
      (error: any) => {
        // this.pageLoader.hide();
        this.toastr.show({
          title: 'Oops!',
          label: 'Something went wrong, please try again later.',
        });
      }
    );
  }

}
