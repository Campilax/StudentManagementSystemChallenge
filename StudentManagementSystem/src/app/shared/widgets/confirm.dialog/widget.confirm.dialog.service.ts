import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class WidgetConfirmDialogService {
    public dialog = new Subject<void>();
    public label = new BehaviorSubject('Loading, please wait...');
    public okayButtonLabel = new BehaviorSubject('Okay, continue');

    // event handler
    public onOkay = new Subject<void>();

    show() {
        this.dialog.next();
    }

    hide() {
        // this.dialog.next(null);
    }

    setLabel(label: string) {
        this.label.next(label);
    }

    setOkayButtonLabel(label: string) {
        this.okayButtonLabel.next(label);
    }

    addEventHandler(event: any) {
        this.onOkay.next(event);
    }
}