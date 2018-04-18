import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsPage } from '../events/events';
import { EventDetailsPage } from '../event-details/event-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goToEvents() {
    this.navCtrl.push(EventsPage);
  }

  goToEventDetail() {
    this.navCtrl.push(EventDetailsPage);
  }
}
