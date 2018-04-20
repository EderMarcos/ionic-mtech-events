import { Component } from '@angular/core';

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page {

  constructor() { }

  doRefresh(refresher) {
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);

  }
}
