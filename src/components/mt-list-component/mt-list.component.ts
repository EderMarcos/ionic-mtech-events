import { Component, Input, SimpleChange } from '@angular/core';
import { ModalController, NavController } from "ionic-angular";

import { MtFormFeedbackPage } from "../../pages/mt-form-feedback/mt-form-feedback";
import { EventInterface } from "../../interfaces/event-interface";
import { MtDetailEventPage } from "../../pages/mt-detail-event/mt-detail-event";
import { SwitchEventService } from "../../providers/switch-event/switch-event-service";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  constructor(
    private readonly navCtrl: NavController,
    private readonly switchEvent: SwitchEventService,
    private readonly modalCtrl: ModalController) {
  }

  @Input() data: EventInterface[];
  @Input() onNullImage: string = 'https://picsum.photos/80/80';
  @Input() typeDate: string = 'shortTime';

  onItemClick(event: EventInterface) {
    // Todo logica para validar si aun puede abrir el modal o si es muy tarde
    if (event.breakFast) {
      return;
    }
    if (event.available) {
      let modal = this.modalCtrl.create(MtFormFeedbackPage, { event: event });
      return modal.present();
    }
    this.navCtrl.push(MtDetailEventPage, { event });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.data) {
      console.log(this.data);
      this.switchEvent.setEvents(this.data);
      // this.switchEvent.getCurrentEvent()
      //   .subscribe(a => console.log(a));
    }
  }

  verifyEventIsValid(event: EventInterface): boolean {
    const now = new Date().getTime();
    if (now < +event.endTime) {
      console.log(((+event.endTime) - now) / 1000);
      console.log('Valid');
      return true;
    } else {
      console.error('Ya caduco', event.id, event.eventName);
      return false;
    }
  }
}
