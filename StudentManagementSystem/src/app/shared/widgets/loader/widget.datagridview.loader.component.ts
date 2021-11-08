import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'widget-datagridview-loader',
  templateUrl: 'widget.datagridview.loader.component.html',
  styleUrls: ['widget.datagridview.loader.component.css']
})
export class WidgetDatagridviewLoaderComponent implements OnInit {

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
