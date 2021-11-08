import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { AuthService } from '../shared/services/auth.service';
import { WidgetLoaderService } from '../shared/widgets/loader/widget.loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public variables
  public data: any = {};
  public inProgress = false;
  public isLoginError = false;
  public loginErrorMessage: string = '';

  constructor(
    public globals: GlobalService,
    public router: Router,
    public authService: AuthService,
    public loaderService: WidgetLoaderService) {
    this.globals.isAccountLogInPage = true;
    this.globals.isAccountLoggedIn = false;
  }

  ngOnInit() {
    //
  }

  public login(): void {
    try {
      // enable loader
      this.inProgress = true;
      this.loaderService.show();

      // call login service
      this.authService
        .login(this.data).then(
          (response: any) => {
            this.loaderService.hide();
            this.inProgress = false;
            this.isLoginError = false;
            this.router.navigate(['/students']);
          },
          (error: any) => {
            this.inProgress = false;
            this.isLoginError = true;
            this.loginErrorMessage = error.ErrorMessage;
          }
        );
    }
    catch (ex) {
      throw ex;
    }
  }

}
