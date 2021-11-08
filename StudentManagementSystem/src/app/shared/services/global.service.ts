import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

@Injectable()
export class GlobalService {
  public applicationTitle = "Student Portal";

  public baseUrl: any;
  public baseApiUrl: any;

  public isLoading = false;
  public isPageLoading = false;

  public isAccountLoggedIn = false;
  public isAccountLogInPage = false;

  public selectedLoggedInAccountPageTab: any;

  public emailValidationPattern: any =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  public appNotifier: any = new Subscriber();

  public url = new URL(decodeURIComponent(window.location.href));
  public urlParameters: any = this.url.pathname.substring(1).split('/');

  public currentUser: any;

  public constructor() {
    this.baseUrl = this.url.href;
    this.baseApiUrl = 'http://localhost/api.studentmanagementsystem.web/api';

  }

  activateDropdown(): void {
    // activate popper.js dropdown menu
    const dropDownButtons = document.querySelectorAll(
      '*[data-toggle="dropdown"]'
    );
    Array.prototype.forEach.call(dropDownButtons, (dropDownButton: any) => {
      dropDownButton.click();
    });
  }

}
