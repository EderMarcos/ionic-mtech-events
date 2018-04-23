import { Component } from '@angular/core';
import { DataService } from "../../providers/dataService/dataService";

@Component({
  selector: 'page-mt-event-page-2',
  templateUrl: 'mt-event-page-2.html',
})
export class MtEventPage_2Page {

  private events;

  constructor(private _dataService: DataService) {
    this._dataService.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '2').orderBy('date', 'asc'))})
      .then(events => this.events = events);
  }

  doRefresh(refresher) {
    this._dataService.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '2').orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then(refresher.complete());
  }
}
