import { Component } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";
import { Network } from "@ionic-native/network";

@Component({
  selector: 'page-mt-detail-event',
  templateUrl: 'mt-detail-event.html',
})
export class MtDetailEventPage extends BaseComponent {

  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private tabBarElement: any;

  constructor(
    private readonly navParams: NavParams,
    private readonly dataService: DataService,
    private readonly loader: LoaderService,
    private readonly storage: StorageService,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.event = navParams.get('event');
    this.event.eventImg = this.isOnline ? this.event.eventImg : null;

    // Get data from local storage
    this.storage.getEntity('user')
      .then((user: UserInterface) => this.user = user)
      .then(() => this.isOnline ? this.getFeedback() : null);
  }

  getFeedback() {
    this.loader.showLoading({ content: 'Loading...', duration: 0 });
    this.dataService.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('email', '==', this.user.email).where('idEvent', '==', this.event.id))})
      .then(data => data[0])
      .then((feed: FeedbackInterface) => this.feedback = feed)
      .then(() => this.loader.clear());
  }

  getEventById() {
    this.dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('id', '==', this.event.id))})
      .then(data => data[0])
      .then((event: EventInterface) => this.event = event);
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  onConnect(): void {
    this.getFeedback();
    this.getEventById();
  }

  onDisconnect(): void { }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
