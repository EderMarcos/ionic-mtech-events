import { OneSignal, OSNotificationOpenedResult } from "@ionic-native/onesignal";
import { NavController, Platform } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { Component } from '@angular/core';
import { Network } from "@ionic-native/network";

import { PushNotificationProvider } from "../../providers/push-notification/push-notification";
import { ActionSheetService } from "../../providers/action-sheet/action-sheet-service";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { MtSigninPage } from "../mt-signin/mt-signin";
import { DataService } from "../../providers/data/data-service";
import { MtAboutPage } from "../mt-about-page/mt-about-page";

import { EventInterface } from "../../interfaces/event-interface";
import {MtTabsComponent} from "../../components/mt-tabs-component/mt-tabs.component";
import {UserInterface} from "../../interfaces/user-interface";

@Component({
  selector: 'page-mt-event-page-1',
  templateUrl: 'mt-event-page-1.html',
})
export class MtEventPage_1Page extends BaseComponent {

  private events;
  private subscription: Subscription;

  constructor(
    private readonly pushNotification: PushNotificationProvider,
    private readonly storage: StorageService,
    private readonly navCtrl: NavController,
    private readonly actionSheet: ActionSheetService,
    private readonly ds: DataService,
    private readonly loader: LoaderService,
    private readonly oneSignal: OneSignal,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
    this.getEventsByDay('1');
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('964720b7-7958-4dc5-9ad5-7d570b3fefb2', '1033092115983');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationOpened()
        .map((payload: OSNotificationOpenedResult) => payload.notification.payload.additionalData.day)
        .subscribe(day => {
          this.storage.getEntity('user')
            .then((user: UserInterface) => {
              if (user.email) {
                return this.navCtrl.parent.select(+day);
              }
              this.navCtrl.push(MtSigninPage);
            });
        });
      this.oneSignal.endInit();
    }

    this.initNetworkWatchEvents();
  }

  getEventsByDay(day: string) {
    this.loader.showLoading({ content: 'Loading events...', duration: 0 });
    this.subscription = this.ds.getEntities({
      collection: 'events',
      query: (ref => ref.where('day', '==', day).orderBy('date', 'asc'))
    }).subscribe((events: EventInterface[]) => {
      this.subscription.unsubscribe();
      console.log(events);
      this.events = events.filter(f => f.isVisible);
      this.loader.clear();
    });
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

  onConnect(): void {
    this.getEventsByDay('1');
  }

  onDisconnect(): void {
    this.subscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.closeNetworkWatchEvents();
  }
}
