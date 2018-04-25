import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

import { NotificationInterface } from "../../interfaces/notification-interface";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Injectable()
export class NotificationService {

  constructor(
    private readonly platform: Platform,
    private readonly localNotifications: LocalNotifications) {}

  showNotification(params: NotificationInterface) {
    if (this.platform.is('cordova')) {
      this.localNotifications.schedule({
        id: params.id,
        title: params.title,
        text: params.text,
        sound: params.sound || 'file://sound.mp3',
        data: params.data
      });
    }
  }
}
