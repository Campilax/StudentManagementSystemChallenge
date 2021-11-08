import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class WidgetAlertDialogService {
  public dialog = new Subject<void>();
  public heading = new BehaviorSubject('Alert');
  public label = new BehaviorSubject('');

  // event handler
  public onOkay = new Subject<void>();

  show(param?: any) {
    this.dialog.next(param);
  }

  setHeading(text: string) {
    this.heading.next(text);
  }

  setLabel(text: string) {
    this.label.next(text);
  }

  addEventHandler(event: any) {
    this.onOkay.next(event);
  }
}
