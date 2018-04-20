import { Component } from '@angular/core';
import { EnventProvider } from "../../providers/envent/envent";

@Component({
  selector: 'page-mt-event-page-3',
  templateUrl: 'mt-event-page-3.html',
})
export class MtEventPage_3Page {

  private events;

  constructor(private _eventProvider: EnventProvider) {
    this._eventProvider.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '3').orderBy('date', 'asc'))})
      .then(events => this.events = events);
  }

  doRefresh(refresher) {
    this._eventProvider.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '3').orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then(refresher.complete());
  }
}
