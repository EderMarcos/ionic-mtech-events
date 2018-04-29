import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from "ionic-angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Network } from "@ionic-native/network";

import { FeedbackInterface } from "../../interfaces/feedback-interface";
import { EventInterface } from "../../interfaces/event-interface";
import { QuizInterface } from "../../interfaces/quiz-interface";
import { UserInterface } from "../../interfaces/user-interface";
import { StorageService } from "../../providers/storage/storage-service";
import { LoaderService } from "../../providers/loader/loader-service";
import { BaseComponent } from "../../components/base-component/base.component";
import { ToastService } from "../../providers/toast/toast-service";
import { DataService } from "../../providers/data/data-service";

@Component({
  selector: 'page-mt-form-feedback',
  templateUrl: 'mt-form-feedback.html',
})
export class MtFormFeedbackPage extends BaseComponent {

  private feedbackForm: FormGroup;
  private event: EventInterface;
  private feedback: FeedbackInterface;
  private user: UserInterface;
  private tabBarElement: any;
  private readonly quiz: QuizInterface;

  constructor(
    private readonly navParams: NavParams,
    private readonly loader: LoaderService,
    private readonly storage: StorageService,
    private readonly navCtrl: NavController,
    private _dataService: DataService,
    network: Network,
    platform: Platform,
    toast: ToastService) {
    super(platform, toast, network);
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
    this.validateForm();
    this.getUser();
  }

  private validateForm() {
    this.feedbackForm = new FormGroup({
      'comments': new FormControl('', Validators.required),
      'rate': new FormControl(0, Validators.required)
    });
  }

  private getUser() {
    this.storage.getEntity('user')
      .then((user: UserInterface) => this.user = user)
      .then(user => {
        if (this.isOnline) {
          this.getFeedbackByEventId(this.event.id);
        } else {
          this.storage.getEntity(this.event.id)
            .then((record: FeedbackInterface) => {
              if (record) {
                this.feedback = record;
                this.feedbackForm.get('comments').setValue(record.comments);
                this.feedbackForm.get('rate').setValue(record.rate);
              }
            });
        }
        this.feedback.name = user.name || 'Guest';
        this.feedback.email = user.email;
        this.feedback.idEvent = this.event.id;
        this.quiz.emailUser = user.email;
        this.quiz.idEvent = this.event.id;
      });
  }

  private getFeedbackByEventId(id: string) {
    this._dataService.getEntities({
      collection: 'feedback',
      query: (ref => ref.where('idEvent', '==', id).where('email', '==', this.user.email || ''))
    }).then(res => res[0])
      .then((record: FeedbackInterface) => {
        if (record) {
          this.feedback = record;
          this.feedbackForm.get('comments').setValue(record.comments);
          this.feedbackForm.get('rate').setValue(record.rate);
        }
      });
  }

  async onSubmit() {
    this.feedback.comments = this.feedbackForm.value.comments;
    this.feedback.rate = this.feedbackForm.value.rate;
    if (this.feedback.id) {
      this.feedback.updatedAt = new Date().getTime();
      if (this.isOnline) {
        this.loader.showLoading({ content: 'Sending...', duration: 0 });
        return await this._dataService.updateEntity({ collection: 'feedback', key: this.feedback.id }, this.feedback)
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
      await this._dataService.setEntity('surveyHistory', this.quiz);
      await this._dataService.setEntity('feedback', this.feedback)
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
    this.getUser();
    this.onSubmit();
  }

  onDisconnect(): void { }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}
