import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mt-about',
  templateUrl: 'mt-about-page.html',
})
export class MtAboutPage {

  constructor(
    private readonly navCtrl: NavController,
    private readonly navParams: NavParams) { }
}
