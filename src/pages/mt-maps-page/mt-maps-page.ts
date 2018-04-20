import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  constructor(
    private readonly navCtrl: NavController,
    private readonly navParams: NavParams) { }
}
