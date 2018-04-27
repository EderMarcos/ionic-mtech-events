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
        icon: params.icon || 'res://icon.png',
        vibrate: params.vibrate || true,
        smallIcon: params.smallIcon || 'res://ic_popup_reminder',
        launch: params.launch || true,
        sound: params.sound || this.platform.is('ios') ? 'file://beep.caf' : 'res://platform_default',
        trigger: { at: params.at },
        data: params.data
      });
    }
  }
}
