import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { NavParams } from "ionic-angular";
import { Component } from '@angular/core';

import { EventInterface } from "../../interfaces/event-interface";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  private event: EventInterface;
  private tabBarElement: any;

  constructor(
    private readonly launchNavigator: LaunchNavigator,
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
    this.launchNavigator.navigate(address)
      .then(success => console.log('Launched navigator'));
  }
}
