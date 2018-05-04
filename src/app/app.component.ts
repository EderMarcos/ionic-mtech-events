import { Component } from '@angular/core';
import { timer } from "rxjs/observable/timer";
import { Network } from "@ionic-native/network";
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from "@ionic-native/background-mode";

import { MtSigninPage } from "../pages/mt-signin/mt-signin";
import { ToastService } from "../providers/toast/toast-service";
import { BaseComponent } from "../components/base-component/base.component";
import { StorageService } from "../providers/storage/storage-service";
import { MtTabsComponent } from "../components/mt-tabs-component/mt-tabs.component";
import { PushNotificationProvider } from "../providers/push-notification/push-notification";

import { UserInterface } from "../interfaces/user-interface";

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends BaseComponent {

  rootPage: any;
  showSplash = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    toast: ToastService,
    network: Network,
    private backgroundMode: BackgroundMode,
    private readonly pushNotification: PushNotificationProvider,
    private readonly storage: StorageService) {
    super(platform, toast, network);
    platform.ready().then(() => {

      if (platform.is('cordova')) {
        // timer(3000).subscribe(() => this.showSplash = false)
        this.backgroundMode.setDefaults({ silent: true });
        this.backgroundMode.enable();
        this.backgroundMode.disableWebViewOptimizations();
        statusBar.backgroundColorByName('light');
        splashScreen.hide();
      }

      this.initNetworkWatch();
      this.storage.getEntity('user')
        .then((user: UserInterface) => {
          if (user.email) {
            // this.pushNotification.initNotifications();
            return this.rootPage = MtTabsComponent;
          }
          this.rootPage = MtSigninPage;
        });
    });
  }

  onConnect(): void { }

  onDisconnect(): void { }
}

