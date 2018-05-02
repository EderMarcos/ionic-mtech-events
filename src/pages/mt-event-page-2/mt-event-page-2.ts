import { Component } from '@angular/core';
import { NavController, Platform } from "ionic-angular";
import { Network } from "@ionic-native/network";

import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";
import { MtSigninPage } from "../mt-signin/mt-signin";
import { ActionSheetService } from "../../providers/action-sheet/action-sheet-service";
import { StorageService } from "../../providers/storage/storage-service";
import { MtAboutPage } from "../mt-about-page/mt-about-page";
import {EventInterface} from "../../interfaces/event-interface";

@Component({
  selector: 'page-mt-event-page-2',
  templateUrl: 'mt-event-page-2.html',
})
export class MtEventPage_2Page extends BaseComponent {

  private events;
  firstLoad = false;

  constructor(
    private readonly storage: StorageService,
    private readonly navCtrl: NavController,
    private readonly actionSheet: ActionSheetService,
    private readonly _dataService: DataService,
    private readonly loader: LoaderService,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
    if (this.isOnline) {
      this.getEventsByDay('2');
      setTimeout(() => this.firstLoad = true, 1000);
    }
  }

  getEventsByDay(day: string) {
    this.loader.showLoading({ content: 'Loading events...', duration: 0 });
    this._dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('day', '==', day).orderBy('date', 'asc'))})
      .then((events: EventInterface[]) => this.events = events.filter(f => f.isVisible))
      .then((_) => this.loader.clear());
  }

  onClickOptions() {
    this.actionSheet.show({
      title: 'Options',
      buttons: [
        {
          text: 'About',
          handler: () => {
            this.navCtrl.push(MtAboutPage);
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.storage.clear('user');
            this.navCtrl.push(MtSigninPage);
          }
        }
      ]
    });
  }

  ionViewWillEnter() {
    if (this.isOnline && this.firstLoad) {
      this.getEventsByDay('2');
    }
  }

  onConnect(): void {
    this.getEventsByDay('2');
  }

  onDisconnect(): void { }
}
