import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EventDetailsPage} from "../event-details/event-details";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(public navCtrl: NavController) { }

  goToDetail(event: any) {
    this.navCtrl.push(EventDetailsPage, { event })
  }
}
