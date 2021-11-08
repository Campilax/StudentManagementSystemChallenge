import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class WidgetToastService {
    public toast = new Subject<void>();
    public icon = new BehaviorSubject("");
    public title = new BehaviorSubject("");
    public timestamp = new BehaviorSubject("");
    public label = new BehaviorSubject("");

    // event handler
    public onOkay = new Subject<void>();

    show(args?: any) {
        this.toast.next();

        // 
        if (args && args.icon) {
            this.setIcon(args.icon);
        }

        // 
        if (args && args.title) {
            this.setTitle(args.title);
        }

        // 
        if (args && args.timestamp) {
            this.setTimestamp(args.timestamp);
        }

        // 
        if (args && args.label) {
            this.setLabel(args.label);
        }
    }

    hide() {
        this.toast.next();
    }

    setIcon(icon: string) {
        this.icon.next(icon);
    }

    setTitle(title: string) {
        this.title.next(title);
    }

    setTimestamp(timestamp: string) {
        this.timestamp.next(timestamp);
    }

    setLabel(label: string) {
        this.label.next(label);
    }

    addEventHandler(event: any) {
        this.onOkay.next(event);
    }
}