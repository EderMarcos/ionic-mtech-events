import { Component } from '@angular/core';
import { EnventProvider } from "../../providers/envent/envent";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page {

  private events;

  constructor(private _eventProvider: EnventProvider) {
    this._eventProvider.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '1').orderBy('date', 'asc'))})
      .then(events => this.events = events);
  }

  doRefresh(refresher) {
    this._eventProvider.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '1').orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then(refresher.complete());
  }
}
