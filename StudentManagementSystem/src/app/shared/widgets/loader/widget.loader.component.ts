import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'widget-loader',
  templateUrl: 'widget.loader.component.html',
  styleUrls: ['widget.loader.component.css']
})
export class WidgetLoaderComponent implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() size: any;
  @Input() color: any;

  constructor() {
    // 
  }

  ngOnInit() {
    try {
      // console.log(this.isLoading);
    } catch (error) {

    }
  }

}
