import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { QuizInterface } from "../../interfaces/quiz-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'page-mt-form-feedback',
  templateUrl: 'mt-form-feedback.html',
})
export class MtFormFeedbackPage {

  private feedbackForm: FormGroup;
  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private tabBarElement: any;
  private readonly quiz: QuizInterface;

  constructor(
    private readonly navParams: NavParams,
    private readonly toast: ToastService,
    private readonly loader: LoaderService,
    private readonly storage: StorageService,
    private readonly navCtrl: NavController,
    private _dataService: DataService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
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
    this.feedbackForm = new FormGroup({
      'comments': new FormControl('', Validators.required),
      'rate': new FormControl(0, Validators.required)
    });
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
    this._dataService.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('idEvent', '==', id).where('email', '==', this.user.email || ''))
    })
      .then(res => res[0])
      .then((record: FeedbackInterface) => {
        if (record) {
          this.feedback = record;
          this.feedbackForm.get('comments').setValue(record.comments);
          this.feedbackForm.get('rate').setValue(record.rate);
        }
      });
  }

  async onSubmit() {
    this.loader.showLoading({content: 'Sending...', duration: 0});
    this.feedback.comments = this.feedbackForm.value.comments;
    this.feedback.rate = this.feedbackForm.value.rate;
    if (this.feedback.id) {
      this.feedback.updatedAt = new Date().getTime();
      return await this._dataService.updateEntity({collection: 'feedback', key: this.feedback.id}, this.feedback)
        .then((_) => this.loader.clear())
        .then((_) => {
          this.toast.showToast('Your comment has been updated');
          this.navCtrl.pop();
        });
    }
    await this._dataService.setEntity('surveyHistory', this.quiz);
    await this._dataService.setEntity('feedback', this.feedback)
      .then((_) => this.loader.clear())
      .then((_) => {
        this.toast.showToast('Your comment has been sent');
        this.navCtrl.pop();
      });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
