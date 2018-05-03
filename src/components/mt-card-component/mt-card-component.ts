import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

import { MtMapsPage } from "../../pages/mt-maps-page/mt-maps-page";
import { DataService } from "../../providers/data/data-service";

import { EventInterface } from "../../interfaces/event-interface";

@Component({
  selector: 'mt-card',
  templateUrl: 'mt-card-component.html'
})
export class MtCardComponent {

  currentEvent: EventInterface;

  @Input() events: EventInterface[];
  @Input() onNullImg: string = 'https://picsum.photos/300/300';

  constructor(
    private readonly navCtrl: NavController,
    private readonly ds: DataService) {
    this.getEvents();
  }

  getEvents() {
    this.ds.getEntities({
      collection: 'events',
      query: (ref => ref.orderBy('date', 'asc'))
    }).subscribe((entities: EventInterface[]) => {
      const now = new Date().getTime();
      entities.forEach((ev, id) => {
        if (now > ev.date && now < ev.endTime) {
          this.currentEvent = ev;
        }
      });
    });
  }

  onCardClick() {
    this.navCtrl.push(MtMapsPage, { event: this.currentEvent });
  }
}
