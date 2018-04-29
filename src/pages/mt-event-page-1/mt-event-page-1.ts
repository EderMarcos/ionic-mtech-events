import { Component } from '@angular/core';
import { Platform } from "ionic-angular";
import { Network } from "@ionic-native/network";

import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page extends BaseComponent {

  private events;

  constructor(
    private readonly _dataService: DataService,
    private readonly loader: LoaderService,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
    if (this.isOnline) {
      this.getEventsByDay('1');
    }
  }

  getEventsByDay(day: string) {
    this.loader.showLoading({ content: 'Loading events...', duration: 0 });
    this._dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('day', '==', day).orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then((_) => this.loader.clear());
  }

  onConnect(): void {
    this.getEventsByDay('1');
  }

  onDisconnect(): void { }
}
