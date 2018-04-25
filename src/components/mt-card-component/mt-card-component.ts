import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

import { MtMapsPage } from "../../pages/mt-maps-page/mt-maps-page";
import { SwitchEventService } from "../../providers/switch-event/switch-event-service";
import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'mt-card',
  templateUrl: 'mt-card-component.html'
})
export class MtCardComponent {

  currentEvent: EventInterface;

  constructor(
    private readonly navCtrl: NavController,
    private readonly dataService: DataService,
    private readonly switchEvent: SwitchEventService) {
    this.dataService.getEntities({
      collection: 'events',
      query: (ref => ref.orderBy('date', 'asc'))})
      .then((entities: EventInterface[]) => {
        this.switchEvent.getCurrentOrLastEvent(entities)
          .subscribe(event => {
            if (event.available) {
              this.currentEvent = event
            }
          });
      });
  }

  @Input() onNullImg: string = 'https://picsum.photos/300/300';

  onCardClick() {
    this.navCtrl.push(MtMapsPage, { event: this.currentEvent });
  }
}
