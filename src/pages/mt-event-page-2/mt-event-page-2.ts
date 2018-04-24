import { Component } from '@angular/core';

import { DataService } from "../../providers/data/data-service";
import { LoaderService } from "../../providers/loader/loader-service";

@Component({
  selector: 'page-mt-event-page-2',
  templateUrl: 'mt-event-page-2.html',
})
export class MtEventPage_2Page {

  private events;

  constructor(
    private readonly _dataService: DataService,
    private readonly loader: LoaderService) {
    this.getEventsByDay('2');
  }

  getEventsByDay(day: string) {
    this.loader.showLoading({ content: 'Loading events...', duration: 0 });
    this._dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('day', '==', day).orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then((_) => this.loader.clear());
  }
}
