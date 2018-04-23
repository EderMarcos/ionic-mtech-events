import { Component } from '@angular/core';
import { DataService } from "../../providers/dataService/dataService";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page {

  private events;

  constructor(private _dataService: DataService) {
    this._dataService.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '1').orderBy('date', 'asc'))})
      .then(events => this.events = events);
  }

  doRefresh(refresher) {
    this._dataService.getEntities({ collection: 'events',
      query: (ref => ref.where('day', '==', '1').orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then(refresher.complete());
  }
}
