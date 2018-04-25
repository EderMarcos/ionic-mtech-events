import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { QuizInterface } from "../../interfaces/quiz-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'page-mt-form-feedback',
  templateUrl: 'mt-form-feedback.html',
})
export class MtFormFeedbackPage {

  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private readonly quiz: QuizInterface;

  constructor(
    private readonly view: ViewController,
    private readonly navParams: NavParams,
    private readonly toast: ToastService,
    private readonly storage: StorageService,
    private _dataService: DataService) {
    this.event = this.navParams.get('event');
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
    this.getUser();
  }

  onDismiss() {
    this.view.dismiss();
  }

  getUser() {
    this.storage.getEntity('user')
      .then((user: UserInterface) => this.user = user)
      .then(user => {
        this.getFeedbackByEventId(this.event.id);
        this.feedback.name = user.name || 'Guest';
        this.feedback.email = user.email;
        this.feedback.idEvent = this.event.id;
        this.quiz.emailUser = user.email;
        this.quiz.idEvent = this.event.id;
      });
  }

  getFeedbackByEventId(id: string) {
    this._dataService.getEntities({ collection: 'feedback',
      query: (ref => ref.where('idEvent', '==', id).where('email', '==', this.user.email || '')) })
      .then(res => res[0])
      .then((record: FeedbackInterface) => {
        if (record) {
          this.feedback = record;
        }
      });
  }

  async onSubmit() {
    if (this.feedback.id) {
      this.feedback.updatedAt = new Date().getTime();
      return await this._dataService.updateEntity({ collection: 'feedback', key: this.feedback.id }, this.feedback)
        .then((_) => {
          this.toast.showToast('Your comment has been updated');
          this.onDismiss();
        });
    }
    await this._dataService.setEntity('surveyHistory', this.quiz);
    await this._dataService.setEntity('feedback', this.feedback)
      .then((_) => {
        this.toast.showToast('Your comment has been sent');
        this.onDismiss();
      });
  }
}
