import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class WidgetLoaderService {
    public isLoading = new BehaviorSubject(false);
    public label = new BehaviorSubject("Loading, please wait...");
    public color = new BehaviorSubject("white");
    public size = new BehaviorSubject("120");

    public widgetChange: Subject<any> = new Subject<any>();

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }

    setLabel(label: any) {
        this.label.next(label);
    }

    setColor(color: any) {
        this.color.next(color);
    }

    setSize(size: any) {
        this.size.next(size);
    }
}