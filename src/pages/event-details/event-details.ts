import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  private event: any = {};

  constructor(
    private readonly navCtrl: NavController,
    private readonly navParams: NavParams) {
    this.event = this.navParams.get('event');
  }
}
