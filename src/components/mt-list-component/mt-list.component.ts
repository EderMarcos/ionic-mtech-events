import { Component, Input } from '@angular/core';
import { LoadingController, ModalController, NavController } from "ionic-angular";

import { MtFormFeedbackPage } from "../../pages/mt-form-feedback/mt-form-feedback";
import { EventInterface } from "../../interfaces/eventInterface";
import { MtDetailEventPage } from "../../pages/mt-detail-event/mt-detail-event";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  private readonly  loader: any;

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly navCtrl: NavController,
    private readonly modalCtrl: ModalController) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });
    this.loader.present();

    if (this.data) {
      this.loader.dismissAll();
    }
  }

  @Input() data: any;
  @Input() errImg: string = 'https://picsum.photos/80/80';
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
