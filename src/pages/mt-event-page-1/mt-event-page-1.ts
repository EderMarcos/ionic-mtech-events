import { Component } from '@angular/core';
import { EnventProvider } from "../../providers/envent/envent";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page {

  constructor(private _eventProvider: EnventProvider) {
    this._eventProvider.getEntities({ collection: 'events', query: (ref => ref.where('eventName', '==', 'Welcome'))})
      .then(events => {
        console.log(events);
      });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  fu() {

  }
}
