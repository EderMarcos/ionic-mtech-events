import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { EventInterface } from "../../interfaces/eventInterface";

@Component({
  selector: 'page-mt-maps',
  templateUrl: 'mt-maps-page.html',
})
export class MtMapsPage {

  event: EventInterface;

  constructor(
    private readonly navParams: NavParams) {
    this.event = this.navParams.get('event');
  }
}
