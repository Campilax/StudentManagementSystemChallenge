import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './shared/services/auth.service';
import { GlobalService } from './shared/services/global.service';
import { StateManagementService } from './shared/services/state.management.service';
import { WidgetLoaderService } from './shared/widgets/loader/widget.loader.service';
import { WidgetPageLoaderService } from './shared/widgets/loader/widget.page.loader.service';

import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery-datetimepicker';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StudentManagementSystem';

  public constructor(
    public globals: GlobalService,
    public authService: AuthService,
    public stateManager: StateManagementService,
    public router: Router,
    public loaderService: WidgetLoaderService,
    public pageLoaderService: WidgetPageLoaderService,
  ) {
    this.globals.isAccountLogInPage = false;
  }

  ngOnInit() {
    
  }
}
