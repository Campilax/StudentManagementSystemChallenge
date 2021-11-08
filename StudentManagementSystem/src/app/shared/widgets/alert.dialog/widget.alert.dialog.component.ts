import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { WidgetAlertDialogService } from './widget.alert.dialog.service';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'widget-alert-dialog',
  templateUrl: 'widget.alert.dialog.component.html',
  styleUrls: ['widget.alert.dialog.component.css'],
})
export class WidgetAlertDialogComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() heading: string = 'Notification';
  @Input() label: string = '';

  @Output() widgetOkayButtonClick = new EventEmitter();

  private widgetOkayButtonClickEvent: any;
  public passedParam: any;

  constructor(public widgetAlertDialogService: WidgetAlertDialogService) {
    this.widgetAlertDialogService.dialog.subscribe((param?: any) => {
      this.passedParam = param;
      ($('#alertDialogModal') as any).modal('show');
    });
    this.widgetAlertDialogService.heading.subscribe((text: string) => {
      if (document.getElementById('alert-box-heading'))
        document.getElementById('alert-box-heading').innerHTML = text;
    });
    this.widgetAlertDialogService.label.subscribe((text: string) => {
      if (document.getElementById('alert-box-label'))
        document.getElementById('alert-box-label').innerHTML = text;
    });
    this.widgetAlertDialogService.onOkay.subscribe(
      (event) => (this.widgetOkayButtonClickEvent = event)
    );
  }

  ngOnInit() {
    this.widgetAlertDialogService.setHeading(this.heading);
  }

  hideDialog() {
    ($('#alertDialogModal') as any).modal('hide');
  }

  setHeading(heading: string): void {
    this.heading = heading;
    (document.getElementById('alert-box-heading') as any).innerHTML = this.heading;
  }

  setLabel(text: string): void {
    this.label = text;
    (document.getElementById('alert-box-label') as any).innerHTML = this.label;
  }

  onOkay(event?: any) {
    try {
      if (this.widgetOkayButtonClickEvent) {
        this.widgetOkayButtonClickEvent(event);
      }
      if (this.passedParam?.callback) {
        this.passedParam?.callback();
      }
      ($('#alertDialogModal') as any).modal('hide');
    } catch (e) {
      throw e;
    }
  }
}
