import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { OneSignal, OSNotificationOpenedResult } from "@ionic-native/onesignal";

import { EventInterface } from "../../interfaces/event-interface";

@Injectable()
export class PushNotificationProvider {

  constructor(
    private readonly platform: Platform,
    private readonly oneSignal: OneSignal) {
  }

  initNotifications() {
    if (this.platform.is('cordova')) {
      // this.oneSignal.startInit('964720b7-7958-4dc5-9ad5-7d570b3fefb2', '1033092115983');
      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      // this.oneSignal.handleNotificationOpened()
      //   .map((payload: OSNotificationOpenedResult) => payload.notification.payload.additionalData.event)
      //   .subscribe((event: any) => {
      //   console.log(event);
      // });
      // this.oneSignal.endInit();
    }
  }

  subscribe() {
    return this.oneSignal.handleNotificationOpened()
      .map((payload: OSNotificationOpenedResult) => payload.notification.payload.additionalData.event);
  }
}
