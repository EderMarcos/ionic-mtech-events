import { Component, Input, SimpleChange } from '@angular/core';
import { NavController } from "ionic-angular";

import { EventInterface } from "../../interfaces/event-interface";
import { MtFormFeedbackPage } from "../../pages/mt-form-feedback/mt-form-feedback";
import { SwitchEventService } from "../../providers/switch-event/switch-event-service";
import { MtDetailEventPage } from "../../pages/mt-detail-event/mt-detail-event";
import { DataService } from "../../providers/data/data-service";
import {FeedbackInterface} from "../../interfaces/feedback-interface";
import {UserInterface} from "../../interfaces/user-interface";
import {StorageService} from "../../providers/storage/storage-service";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  private feedbackArray: any[] = [];
  private user: UserInterface;

  constructor(
    private readonly navCtrl: NavController,
    private readonly switchEvent: SwitchEventService,
    private readonly storage: StorageService,
    private readonly dataService: DataService) {
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
    this.navCtrl.push(event.surveyEnable ? MtFormFeedbackPage : MtDetailEventPage, { event });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.events) {
      // this.switchEvent.getCurrentOrLastEvent(this.events)
      //   .subscribe(event => {
      //     if (event.id && !event.available) {
      //       return this.events.find(f => f.id === event.id).available = false;
      //     } else if (event.available && event.surveyEnable) {
      //       this.notification.showNotification({
      //         id: event.date,
      //         text: `This is a survey about event: ${ event.eventName }, remember that you only have 10 minutes to send your answer`,
      //         title: 'New survey available!'
      //       }, this.navCtrl)
      //     }
      //   });
    }
  }

  getFeedback() {
    this.dataService.getEntities2({
      collection: 'feedback',
      query: (ref => ref.where('email', '==', this.user.email)) })
      .subscribe(data => {
        this.feedbackArray = data;
        console.log(data);
      })
  }

  getRateByEvent(id: string = 'GAMc8wjrHSDRSgKeaeLj') {
    if (this.feedbackArray) {
      let aux = this.feedbackArray.find((feedback: FeedbackInterface) => feedback.idEvent === id);
      return aux ? aux.rate : false;
    }
  }

  ionViewWillLeave() {
    console.error('Salio');
  }
}
