import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './shared/services/global.service';
import { InterceptorService } from './shared/services/interceptor.service';
import { StateManagementService } from './shared/services/state.management.service';
import { WidgetAlertDialogService } from './shared/widgets/alert.dialog/widget.alert.dialog.service';
import { WidgetConfirmDialogService } from './shared/widgets/confirm.dialog/widget.confirm.dialog.service';
import { WidgetDataGridService } from './shared/widgets/data/widget.grid.service';
import { WidgetDataTableService } from './shared/widgets/data/widget.table.service';
import { WidgetLoaderService } from './shared/widgets/loader/widget.loader.service';
import { WidgetPageLoaderService } from './shared/widgets/loader/widget.page.loader.service';
import { WidgetToastService } from './shared/widgets/toast/widget.toast.service';
import { RouterModule } from '@angular/router';

import { FormValidationService } from './shared/services/form.validation.service';
import { StudentsComponent } from './students/students.component';
import { WidgetCreateOrEditStudentComponent } from './students/widget.createoredit.student.component';
import { StudentService } from './students/student.service';
import { UserService } from './users/user.service';
import { UsersComponent } from './users/users.component';
import { WidgetCreateOrEditUserComponent } from './users/widget.createoredit.user.component';
import { WidgetAlertDialogComponent } from './shared/widgets/alert.dialog/widget.alert.dialog.component';
import { WidgetConfirmDialogComponent } from './shared/widgets/confirm.dialog/widget.confirm.dialog.component';
import { WidgetToastComponent } from './shared/widgets/toast/widget.toast.component';
import { WidgetPaginationComponent } from './shared/widgets/pagination/widget.pagination.component';
import { ScrollerHelper } from './shared/helpers/scroller.helper';
import { WidgetLoaderComponent } from './shared/widgets/loader/widget.loader.component';

@NgModule({
  declarations: [ 

    // components
    AppComponent,

    LoginComponent,

    StudentsComponent,
    WidgetCreateOrEditStudentComponent,

    UsersComponent,
    WidgetCreateOrEditUserComponent,

    WidgetAlertDialogComponent,
    WidgetConfirmDialogComponent,
    WidgetToastComponent,
    WidgetPaginationComponent,
    WidgetLoaderComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '' },

    StudentService,
    UserService,
    
    // shared services
    AuthService,
    StateManagementService,
    InterceptorService,
    GlobalService,
    FormValidationService,

    // shared widget services
    WidgetPageLoaderService,
    WidgetConfirmDialogService,
    WidgetAlertDialogService,
    WidgetToastService,
    WidgetDataTableService,
    WidgetDataGridService,
    WidgetLoaderService,

    ScrollerHelper

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
