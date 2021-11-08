import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import * as $ from 'jquery';
import { StateManagementService } from '../../services/state.management.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'widget-auth-knob',
  templateUrl: 'widget.auth.knob.component.html',
  styleUrls: ['widget.auth.knob.component.css']
})
export class WidgetAuthKnobComponent implements OnInit {

// event
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickLogin: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickSignup: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickProfile: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickLogout: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickAccountSettings: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickChangeMyPassword: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickHelp: EventEmitter<any> = new EventEmitter();

  public authState: any;
  public sessionAuthDetails: any;

  constructor(public stateManager: StateManagementService, public authService: AuthService) {
    // console.log(this.authService.authData);
  }

  ngOnInit(): void {
    try {
      this.authState = this.stateManager.get('auth-state');
      this.sessionAuthDetails = this.stateManager.get('account-details');

      // this.identity = this.authService.getData().Details;
      // console.log(this.authService.identity);
    } catch (error) {

    }
  }

  onLoginClick(event?: any): void {
    this.onClickLogin.emit(event);
  }

  onSignupClick(event?: any): void {
    this.onClickSignup.emit(event);
  }

  onProfileClick(event?: any): void {
    this.onClickProfile.emit(event);
  }

  onLogoutClick(event?: any): void {
    this.onClickLogout.emit(event);
  }

  onAccountSettingsClick(event?: any): void {
    this.onClickAccountSettings.emit(event);
  }

  onChangeMyPasswordClick(event?: any): void {
    this.onClickChangeMyPassword.emit(event);
  }

  onHelpClick(event?: any): void {
    this.onClickHelp.emit(event);
  }

}
