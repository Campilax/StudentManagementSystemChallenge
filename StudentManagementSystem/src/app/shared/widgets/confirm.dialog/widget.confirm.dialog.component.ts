import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { WidgetConfirmDialogService } from './widget.confirm.dialog.service';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'widget-confirm-dialog',
  templateUrl: 'widget.confirm.dialog.component.html',
  styleUrls: ['widget.confirm.dialog.component.css']
})
export class WidgetConfirmDialogComponent implements OnInit {

  @Input() toggle: boolean = false;
  @Input() label: string = '';
  @Input() okayButtonLabel: string = '';

  @Output() widgetOkayButtonClick: any = new EventEmitter();

  private widgetOkayButtonClickEvent: any;

  constructor(public service: WidgetConfirmDialogService) {
    this.service.dialog.subscribe(() => this.showDialog());
    this.service.label.subscribe(label => this.label = label);
    this.service.okayButtonLabel.subscribe(label => this.okayButtonLabel = label);
    this.service.onOkay.subscribe(event => this.widgetOkayButtonClickEvent = event);
  }

  ngOnInit() {
    // 
  }

  showDialog() {
    ($('#confirmDialogModal') as any).modal('show');
    console.log('Hey, i am showing now');
  }

  hideDialog() {
    ($('#confirmDialogModal') as any).modal('hide');
  }

  onOkay(event?: any) {
    try {
      this.widgetOkayButtonClickEvent(event);
      ($('#confirmDialogModal') as any).modal('hide');
    } catch (e) {
      throw e;
    }
  }

}
