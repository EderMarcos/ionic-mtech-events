import { Component } from '@angular/core';

@Component({
  selector: 'page-mt-event-page-3',
  templateUrl: 'mt-event-page-3.html',
})
export class MtEventPage_3Page {

  constructor() { }

  doRefresh(refresher) {
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 3000);
  }
}
