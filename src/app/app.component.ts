import { Component } from '@angular/core';
import { timer } from "rxjs/observable/timer";
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from "@ionic-native/background-mode";

import { UserInterface } from "../interfaces/user-interface";
import { MtSigninPage } from "../pages/mt-signin/mt-signin";
import { StorageService } from "../providers/storage/storage-service";
import { MtTabsComponent } from "../components/mt-tabs-component/mt-tabs.component";
import { PushNotificationProvider } from "../providers/push-notification/push-notification";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  showSplash = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private backgroundMode: BackgroundMode,
    private readonly pushNotification: PushNotificationProvider,
    private readonly storage: StorageService) {
    platform.ready().then(() => {
      this.backgroundMode.setDefaults({ silent: true });
      this.backgroundMode.enable();
      this.backgroundMode.disableWebViewOptimizations();
      this.storage.getEntity('user')
        .then((user: UserInterface) => this.rootPage = (user.email) ? MtTabsComponent : MtSigninPage);
      this.pushNotification.initNotifications();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByName('light');
      splashScreen.hide();

      // timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}

