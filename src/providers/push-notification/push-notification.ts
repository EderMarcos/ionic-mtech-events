import { Injectable } from '@angular/core';
import { OneSignal } from "@ionic-native/onesignal";
import { Platform } from "ionic-angular";

@Injectable()
export class PushNotificationProvider {

  constructor(
    private readonly platform: Platform,
    private readonly oneSignal: OneSignal) {
  }

  initNotifications() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('964720b7-7958-4dc5-9ad5-7d570b3fefb2', '1033092115983');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        console.log('Notification received');
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('Notification opened');
      });
      this.oneSignal.endInit();
    }
  }
}
