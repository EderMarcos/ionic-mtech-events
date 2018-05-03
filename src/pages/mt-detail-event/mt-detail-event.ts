import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";
import { Network } from "@ionic-native/network";
import {QuizInterface} from "../../interfaces/quiz-interface";

@Component({
  selector: 'page-mt-detail-event',
  templateUrl: 'mt-detail-event.html',
})
export class MtDetailEventPage extends BaseComponent {

  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private tabBarElement: any;
  private readonly quiz: QuizInterface;

  constructor(
    private readonly navParams: NavParams,
    private readonly dataService: DataService,
    private readonly loader: LoaderService,
    private readonly navCtrl: NavController,
    private readonly storage: StorageService,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.event = navParams.get('event');
    this.event.eventImg = this.isOnline ? this.event.eventImg : null;
    this.feedback = {
      idEvent: null,
      email: null,
      name: null,
      rate: 0,
      comments: null,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.quiz = {
      emailUser: null,
      idEvent: null,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    // Get data from local storage
    this.storage.getEntity('user')
      .then((user: UserInterface) => {
        this.feedback.email = user.email;
        this.feedback.idEvent = this.event.id;
        this.feedback.name = this.event.eventName;
        this.quiz.idEvent = this.event.id;
        this.quiz.emailUser = user.email;
        this.user = user;
      })
      .then(() => this.isOnline ? this.getFeedback() : null);
  }

  getFeedback() {
    this.loader.showLoading({ content: 'Loading...', duration: 0 });
    this.dataService.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('email', '==', this.user.email).where('idEvent', '==', this.event.id))})
      .then(data => data[0])
      .then((feed: FeedbackInterface) => {
        if (feed) {
          this.feedback = feed;
        }
      })
      .then(() => this.loader.clear());
  }

  getEventById() {
    this.dataService.getEntities({
      collection: 'events',
      query: (ref => ref.where('id', '==', this.event.id))})
      .then(data => data[0])
      .then((event: EventInterface) => this.event = event);
  }

  async onSubmit() {
    if (this.feedback.id) {
      this.feedback.updatedAt = new Date().getTime();
      if (this.isOnline) {
        this.loader.showLoading({ content: 'Sending...', duration: 0 });
        return await this.dataService.updateEntity({ collection: 'feedback', key: this.feedback.id }, this.feedback)
          .then(() => this.loader.clear())
          .then(() => {
            this.toast.showToast({ message: 'Your comment has been updated' });
            this.navCtrl.pop();
          });
      } else {
        this.loader.showLoading({ content: 'Saving on local storage...', duration: 2500 });
        return this.storage.setEntity(this.event.id, JSON.stringify(this.feedback));
      }
    }

    if (this.isOnline) {
      this.loader.showLoading({ content: 'Sending...', duration: 0 });
      await this.dataService.setEntity('surveyHistory', this.quiz);
      await this.dataService.setEntity('feedback', this.feedback)
        .then(() => this.loader.clear())
        .then(() => {
          this.storage.clear(this.event.id);
          this.storage.clear(`${ this.event.id }-quiz`);
          this.toast.showToast({ message: 'Your comment has been sent' });
          this.navCtrl.pop();
        });
    } else {
      this.loader.showLoading({ content: 'Saving on local storage...', duration: 2500 });
      this.storage.setEntity(this.event.id, JSON.stringify(this.feedback));
      this.storage.setEntity(`${ this.event.id }-quiz`, JSON.stringify(this.quiz));
    }
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
