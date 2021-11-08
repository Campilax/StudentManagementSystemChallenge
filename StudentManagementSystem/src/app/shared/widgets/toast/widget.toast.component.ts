import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { WidgetToastService } from './widget.toast.service';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'widget-toast',
  templateUrl: 'widget.toast.component.html',
  styleUrls: ['widget.toast.component.css']
})
export class WidgetToastComponent implements OnInit {

  @Input() toggle: boolean = false;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() timestamp: string = '';
  @Input() label: string = '';
  @Input() delay = 5000;
  @Input() animation = true;
  @Input() autoHide = true;

  @Output() widgetOkayButtonClick = new EventEmitter();

  private widgetOkayButtonClickEvent: any;
  private timeoutObject: any;

  constructor(public widgetToastService: WidgetToastService) {
    this.widgetToastService.toast.subscribe(() => this.show());
    this.widgetToastService.icon.subscribe(icon => this.icon = icon);
    this.widgetToastService.title.subscribe(title => this.title = title);
    this.widgetToastService.timestamp.subscribe(timestamp => this.timestamp = timestamp);
    this.widgetToastService.label.subscribe(label => this.label = label);
    this.widgetToastService.onOkay.subscribe(event => this.widgetOkayButtonClickEvent = event);
  }

  ngOnInit() {
    $(() => {
      ($('.toast') as any).toast({
        animation: this.animation,
        autohide: this.autoHide,
        delay: this.delay
      });
    });
  }

  fadeWay() {
    this.timeoutObject = setTimeout(() => {
      this.hide();
    }, this.delay);
  }

  show() {
    this.widgetToastService.icon.subscribe(icon => this.icon = icon);
    this.widgetToastService.title.subscribe(title => this.title = title);
    this.widgetToastService.timestamp.subscribe(timestamp => this.timestamp = timestamp);
    this.widgetToastService.label.subscribe(label => this.label = label);
    this.toggle = true;
    this.fadeWay();
    ($('.toast') as any).toast('show');
  }

  hide() {
    ($('.toast') as any).toast('hide');
    this.toggle = false;
  }

  onOkey(event?: any) {
    try {
      this.widgetOkayButtonClickEvent(event);
      ($('.toast') as any).toast('hide');
      this.toggle = false;
    } catch (e) {
      throw e;
    }
  }

}
