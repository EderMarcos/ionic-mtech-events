import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MtTabsComponent } from "../components/mt-tabs-component/mt-tabs.component";
import { MtSigninPage } from "../pages/mt-signin/mt-signin";
import { StorageService } from "../providers/storage/storage-service";
import { UserInterface } from "../interfaces/user-interface";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private readonly storage: StorageService) {
    platform.ready().then(() => {
      this.storage.getEntity('user')
        .then((record: UserInterface) => this.rootPage = (record.email) ? MtTabsComponent : MtSigninPage);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByName('light');
      splashScreen.hide();
    });
  }
}

