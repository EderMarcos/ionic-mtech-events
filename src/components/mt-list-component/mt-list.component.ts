import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

import { MtDetailEventPage } from "../../pages/mt-detail-event/mt-detail-event";
import { StorageService } from "../../providers/storage/storage-service";
import { DataService } from "../../providers/data/data-service";

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { UserInterface } from "../../interfaces/user-interface";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  private feedbackArray: any[] = [];
  private user: UserInterface;

  constructor(
    private readonly navCtrl: NavController,
    private readonly storage: StorageService,
    private readonly ds: DataService) {
    this.storage.getEntity('user')
      .then((user: UserInterface) => {
        this.user = user;
        this.getFeedback();
      });
  }

  @Input() events: EventInterface[];
  @Input() onNullImage: string = 'https://picsum.photos/80/80';
  @Input() typeDate: string = 'shortTime';

  onItemClick(event: EventInterface) {
    if (event.breakFast) {
      return;
    }
    this.navCtrl.push(MtDetailEventPage, { event });
  }

  getFeedback() {
    this.ds.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('email', '==', this.user.email)) })
      .subscribe(data => this.feedbackArray = data)
  }

  getRateByEvent(id: string) {
    if (this.feedbackArray) {
      let feed = this.feedbackArray.find((feedback: FeedbackInterface) => feedback.idEvent === id);
      return feed ? feed.rate : false;
    }
  }
}
