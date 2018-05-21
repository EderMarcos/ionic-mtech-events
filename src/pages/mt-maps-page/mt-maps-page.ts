import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {NavParams, Platform} from "ionic-angular";
import { Component } from '@angular/core';

import { EventInterface } from "../../interfaces/event-interface";
import {LoaderService} from "../../providers/loader/loader-service";
import {ToastService} from "../../providers/toast/toast-service";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  private event: EventInterface;
  private tabBarElement: any;

  constructor(
    private readonly launchNavigator: LaunchNavigator,
    private readonly toast: ToastService,
    private readonly platform: Platform,
    private readonly navParams: NavParams) {
    this.event = this.navParams.get('event');
  }

  ionViewWillEnter() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  openMaps(address: string) {
    if (this.platform.is('cordova')) {
      return this.launchNavigator.navigate(address)
        .then(_ => console.log('Launched navigator'));
    }
    this.toast.showToast({ message: 'This option is not available if you are from the browser', duration: 4000 });
  }
}
