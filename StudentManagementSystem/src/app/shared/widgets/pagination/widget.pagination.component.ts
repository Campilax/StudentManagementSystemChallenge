import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  SimpleChange,
} from '@angular/core';

import * as $ from 'jquery';
import { PaginationTypeEnum } from '../../enums/pagination.type.enum';
import { ScrollerHelper } from '../../helpers/scroller.helper';

@Component({
  selector: 'widget-pagination',
  templateUrl: 'widget.pagination.component.html',
  styleUrls: ['widget.pagination.component.css'],
})
export class WidgetPaginationComponent implements OnChanges {
  // properties
  // @Input() currentPage: number = 1;

  @Input()
  get currentPage(): any {
    return Number.parseInt(this.$currentPage);
  }
  set currentPage(currentPage: any) {
    this.$currentPage = currentPage;
  }

  @Input()
  get totalPages(): any {
    return this.$totalPages;
  }
  set totalPages(totalPages: any) {
    this.$totalPages = totalPages;
  }

  @Input()
  get rowsPerPage(): any {
    return this.$rowsPerPage;
  }
  set rowsPerPage(rowsPerPage: any) {
    this.$rowsPerPage = rowsPerPage;
  }

  @Input()
  get scrollToTop(): boolean {
    return this.$scrollToTop;
  }
  set scrollToTop(scrollToTop: boolean) {
    this.$scrollToTop = scrollToTop;
  }

  @Input()
  get type(): any {
    return this.$type;
  }
  set type(type: any) {
    this.$type = type;
  }

  // event
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  private $currentPage: any = 1;
  private $totalPages: any;
  private $rowsPerPage: any;
  private $scrollToTop: boolean = true;
  private $type: any = PaginationTypeEnum.NUMBERED;

  public PaginationTypeEnum = PaginationTypeEnum;

  public maxPages: number = 7;
  public pages: number = 0;
  public activePage: number = 0;

  public pagesBefore: number = 0;
  public pagesAfter: number = 0;

  public isNumberedEnum: boolean = false;
  public isRightLeftEnum: boolean = false;

  public _pages: Array<number> = [];
  public _totalPages: Array<number> = [];
  public _maxPages: Array<number> = [];
  public _firstPagesBefore: Array<number> = [];
  public _pageSubsetBefore: Array<number> = [];
  public _lastPagesBefore: Array<number> = [];
  public _firstPagesAfter: Array<number> = [];
  public _pageSubset1After: Array<number> = [];
  public _pageSubset2After: Array<number> = [];
  public _lastPagesAfter: Array<number> = [];
  public _pageEllipsisToggle1After: Array<number> = [];
  public _pageEllipsisToggle2After: Array<number> = [];
  public _middlePagesAfter: Array<number> = [];

  public constructor(public scrollerHelper: ScrollerHelper) {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.showPages();
  }

  getMicroTime(get_as_float?: boolean): any {
    const now: any = new Date().getTime() / 1000;
    var s = parseInt(now);
    return get_as_float ? now : Math.round((now - s) * 1000) / 1000 + ' ' + s;
  }

  showPages() {
    // clear
    this._pages = [];
    this._totalPages = [];
    this._maxPages = [];
    this._firstPagesBefore = [];
    this._pageSubsetBefore = [];
    this._lastPagesBefore = [];
    this._firstPagesAfter = [];
    this._pageSubset1After = [];
    this._pageSubset2After = [];
    this._lastPagesAfter = [];
    this._pageEllipsisToggle1After = [];
    this._pageEllipsisToggle2After = [];
    this._middlePagesAfter = [];

    // scroll to top
    if (this.scrollToTop) this.scrollerHelper.scrollTop();

    // tslint:disable-next-line: radix
    const totalPages = parseInt(this.totalPages);
    if (this.totalPages) {
      this.activePage = 1;

      this.pagesBefore = this.currentPage - 1;
      this.pagesAfter = totalPages - this.currentPage;

      this._totalPages = [...Array(totalPages).keys()].map((x) => x + 1);
      this._maxPages = [...Array(this.maxPages).keys()].map((x) => x + 1);

      // pages
      if (totalPages <= this.maxPages) {
        this._pages = [...Array(totalPages).keys()].map((x) => x + 1);
      } else if (this.pagesAfter <= 3) {
        // pages after less than or equal to 3
        this._firstPagesAfter = [...Array(1).keys()].map((x) => x + 1);
        const _pageSubset1After =
          totalPages - this.maxPages - 1 > 1
            ? totalPages - this.maxPages - 1
            : 2;
        this._pageSubset1After = [...Array(1).keys()].map(
          (x) => (x = _pageSubset1After)
        );

        const lastPagesCountAfter = totalPages - this.maxPages + 2;
        this._lastPagesAfter = [
          ...Array(totalPages - lastPagesCountAfter).keys(),
        ].map((x) => x + lastPagesCountAfter + 1);
      } else if (this.pagesBefore <= 3) {
        // pages before greater than or equal to 3
        this._firstPagesBefore = [...Array(this.maxPages - 2).keys()].map(
          (x) => x + 1
        );
        const pageSubsetBefore =
          this.maxPages + 2 < totalPages ? this.maxPages - 1 : totalPages - 1;
        this._pageSubsetBefore = [...Array(1).keys()].map(
          (x) => (x = pageSubsetBefore)
        );
        this._lastPagesBefore = [...Array(1).keys()].map(
          (x) => (x = totalPages)
        );
      } else if (this.pagesAfter > 3) {
        // pages after
        this._firstPagesAfter = [...Array(1).keys()].map((x) => x + 1);

        // first ellipsis
        const pageEllipsisToggle1After =
          this.currentPage - 5 > 1 ? this.currentPage - 3 : 1;
        this._pageEllipsisToggle1After = [...Array(1).keys()].map(
          (x) => (x = pageEllipsisToggle1After)
        );

        // Show middle pages
        const startOfMiddlePage = this.currentPage - 2;
        const endOfMiddlePage = this.currentPage + 2;
        this._middlePagesAfter = [
          ...Array(endOfMiddlePage - startOfMiddlePage).keys(),
        ].map((x) => x + startOfMiddlePage);

        // last ellipsis
        const pageEllipsisToggle2After =
          this.currentPage + 5 < totalPages
            ? this.currentPage + 2
            : totalPages - 1;
        this._pageEllipsisToggle2After = [...Array(1).keys()].map(
          (x) => (x = pageEllipsisToggle2After)
        );

        this._lastPagesAfter = [...Array(1).keys()].map(
          (x) => (x = totalPages)
        );
      }
    }
  }

  onClickPage(pageNumber: number, event?: any) {
    this.currentPage = pageNumber;
    if (pageNumber < 1) return;
    if (this.currentPage - 1 > 0) this.onPageChange.emit(this.currentPage);
    if (this.currentPage < this.totalPages)
      this.onPageChange.emit(this.currentPage);
    this.showPages();
  }
}
