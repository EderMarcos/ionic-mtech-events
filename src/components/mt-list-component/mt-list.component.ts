import { Component, Input } from '@angular/core';
import { ModalController, NavController } from "ionic-angular";

import { MtFormFeedbackPage } from "../../pages/mt-form-feedback/mt-form-feedback";
import { EventInterface } from "../../interfaces/event-interface";
import { MtDetailEventPage } from "../../pages/mt-detail-event/mt-detail-event";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  constructor(
    private readonly navCtrl: NavController,
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
    if (event.eventName.toLocaleLowerCase() === 'welcome') {
      let modal = this.modalCtrl.create(MtFormFeedbackPage, { event: event });
      return modal.present();
    }
    this.navCtrl.push(MtDetailEventPage, { event });
  }
}
