import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { EventInterface } from "../../interfaces/eventInterface";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  event: EventInterface;
  tabBarElement: any;

  constructor(
    private readonly navParams: NavParams) {
    this.event = this.navParams.get('event');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
