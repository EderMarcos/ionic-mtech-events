import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DataService } from "../../providers/dataService/dataService";
import { EventInterface } from "../../interfaces/eventInterface";
import { FeedbackInterface } from "../../interfaces/feedbackInterface";
import { QuizInterface } from "../../interfaces/quizInterface";
import { ToastProvider } from "../../providers/toast/toast";

@Component({
  selector: 'page-mt-form-feedback',
  templateUrl: 'mt-form-feedback.html',
})
export class MtFormFeedbackPage {

  private event: EventInterface;
  private feedback: FeedbackInterface;
  private readonly quiz: QuizInterface;

  constructor(
    private readonly view: ViewController,
    private readonly navParams: NavParams,
    private readonly toast: ToastProvider,
    private _dataService: DataService) {
    this.event = this.navParams.get('event');
    this.quiz = {
      emailUser: 'skrap.marcos@gmail.com',
      idEvent: this.event.id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.getFeedbackByEventId(this.event.id);
  }

  onDismiss() {
    this.view.dismiss();
  }

  getFeedbackByEventId(id: string) {
    this._dataService.getEntities({ collection: 'feedback',
      query: (ref => ref.where('idEvent', '==', id).where('email', '==', 'skrap.marcos@gmail.com')) })
      .then(res => res[0])
      .then((record: FeedbackInterface) => {
        if (record) {
          this.feedback = record;
        } else {
          this.feedback = {
            idEvent: id,
            email: null,
            name: null,
            rate: 0,
            comments: null,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          };
        }
      });
  }

  async onSubmit() {
    if (this.feedback.id) {
      this.feedback.updatedAt = new Date().getTime();
      return await this._dataService.updateEntity({ collection: 'feedback', key: this.feedback.id }, this.feedback)
        .then((_) => {
          this.toast.showToast('Updated Record');
          this.onDismiss();
        });
    }
    await this._dataService.setEntity('surveyHistory', this.quiz);
    await this._dataService.setEntity('feedback', this.feedback)
      .then((_) => {
        this.toast.showToast('Added Record');
        this.onDismiss();
      });
  }
}
