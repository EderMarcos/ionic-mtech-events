import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  lat: number;
  lng: number;

  constructor(
    private readonly view: ViewController,
    private readonly navParams: NavParams) {
    this.lat = 20.561113;
    this.lng = -100.366558;
  }

  @Input() allowFooter: boolean = true;

  onDismiss() {
    this.view.dismiss();
  }
}
