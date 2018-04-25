import {Component, Input, SimpleChange} from '@angular/core';
import { NavController } from "ionic-angular";

import { MtMapsPage } from "../../pages/mt-maps-page/mt-maps-page";
import { SwitchEventService } from "../../providers/switch-event/switch-event-service";
import { EventInterface } from "../../interfaces/event-interface";

@Component({
  selector: 'mt-card',
  templateUrl: 'mt-card-component.html'
})
export class MtCardComponent {

  currentEvent: EventInterface;

  constructor(
    private readonly navCtrl: NavController,
    private readonly switchEvent: SwitchEventService,) {
  }

  @Input() events: EventInterface[];
  @Input() onNullImg: string = 'https://picsum.photos/300/300';

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.events) {
      this.switchEvent.getCurrentEvent(this.events)
        .subscribe(event => {
          console.log('Evento Actual', event.eventName);
          this.currentEvent = event;
        });
    }
  }

  onCardClick() {
    this.navCtrl.push(MtMapsPage, { event: this.currentEvent });
  }
}
