import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mt-form-feedback',
  templateUrl: 'mt-form-feedback.html',
})
export class MtFormFeedbackPage {

  private rating: number;
  private event: any;

  constructor(
    private readonly view: ViewController,
    private readonly navParams: NavParams) {
    this.rating = 0;
    this.event = this.navParams.get('event');
  }

  onModelChange(e) {
    console.log(e);
  }

  dismiss() {
    this.view.dismiss();
  }
}
