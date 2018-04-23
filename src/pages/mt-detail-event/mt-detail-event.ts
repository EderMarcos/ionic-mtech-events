import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EventInterface } from "../../interfaces/eventInterface";

@Component({
  selector: 'page-mt-detail-event',
  templateUrl: 'mt-detail-event.html',
})
export class MtDetailEventPage {

  private event: EventInterface;

  constructor(
    private readonly navParams: NavParams) {
    this.event = navParams.get('event');
  }
}
