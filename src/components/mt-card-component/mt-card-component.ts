import { Component, Input } from '@angular/core';
import {NavController, Platform} from "ionic-angular";

import { MtMapsPage } from "../../pages/mt-maps-page/mt-maps-page";
import { SwitchEventService } from "../../providers/switch-event/switch-event-service";
import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../../providers/data/data-service";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  selector: 'mt-card',
  templateUrl: 'mt-card-component.html'
})
export class MtCardComponent {

  currentEvent: EventInterface;

  constructor(
    private readonly navCtrl: NavController,
    private readonly dataService: DataService,
    private readonly localNotifications: LocalNotifications,
    private readonly platform: Platform,
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

    // Notifications
    this.localNotifications.schedule({
      id: 1,
      title: 'Title',
      text: 'Textoooooooo',
      sound: 'file://beep.caf',
      trigger: { at: new Date(new Date().getTime() + 5 * 1000) },
      data: { mydata: 'lorem' }
    });
  }

  @Input() onNullImg: string = 'https://picsum.photos/300/300';

  onCardClick() {
    this.navCtrl.push(MtMapsPage, { event: this.currentEvent });
  }
}
