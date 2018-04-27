import { Platform } from "ionic-angular";
import { Component } from '@angular/core';

import { DataService } from "../../providers/data/data-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { NetworkService } from "../../providers/network/network-service";
import { AlertService } from "../../providers/alert/alert-service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page {

  private events;
  private subscription: Subscription;

  constructor(
    private readonly _dataService: DataService,
    private readonly network: NetworkService,
    private readonly platform: Platform,
    private readonly alert: AlertService,
    private readonly loader: LoaderService) {
  }

  getEventsByDay(day: string) {
    this.loader.showLoading({ content: 'Loading events...', duration: 0 });
    this._dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('day', '==', day).orderBy('date', 'asc'))})
      .then(events => this.events = events)
      .then((_) => this.loader.clear());
  }

  ionViewWillEnter() {
    if (this.network.isConnected()) {
      this.getEventsByDay('1');
    }
    this.subscription = this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.getEventsByDay('1');
      }, 3000);
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
