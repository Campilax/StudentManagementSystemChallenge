import { Injectable } from '@angular/core';

@Injectable()
export class ScrollerHelper {

  scrollTop(): void {
    const scrollToTop: any = window.setInterval(() => {
      const pos: any = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }
}
