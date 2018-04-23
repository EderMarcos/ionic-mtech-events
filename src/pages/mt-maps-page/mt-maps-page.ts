import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  lat: number;
  lng: number;

  constructor(private readonly navParams: NavParams) {
    this.lat = 51.678418;
    this.lng = 7.809007;
  }

  onDismiss() {

  }
}
