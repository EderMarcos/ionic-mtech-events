import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'page-mt-detail-event',
  templateUrl: 'mt-detail-event.html',
})
export class MtDetailEventPage {

  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private tabBarElement: any;

  constructor(
    private readonly navParams: NavParams,
    private readonly dataService: DataService,
    private readonly loader: LoaderService,
    private readonly storage: StorageService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.event = navParams.get('event');
    this.storage.getEntity('user')
      .then((user: UserInterface) => this.user = user)
      .then((_) => this.getFeedback());
  }

  getFeedback() {
    this.loader.showLoading({ content: 'Loading...', duration: 0 });
    this.dataService.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('email', '==', this.user.email).where('idEvent', '==', this.event.id))})
      .then(data => data[0])
      .then((feed: FeedbackInterface) => this.feedback = feed)
      .then((_) => this.loader.clear());
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
