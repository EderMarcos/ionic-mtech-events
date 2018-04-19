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

  slides: any[] = [
    'https://picsum.photos/400/300?image=0',
    'https://picsum.photos/400/300?image=1',
    'https://picsum.photos/400/300?image=2',
    'https://picsum.photos/400/300?image=3',
    'https://picsum.photos/400/300?image=4',
    'https://picsum.photos/400/300?image=5',
  ];

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

  goToEvents() {
    this.navCtrl.push(EventsPage);
  }

  goToEventDetail() {
    this.navCtrl.push(EventDetailsPage);
  }
}
