import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

import { MtMapsPage } from "../../pages/mt-maps-page/mt-maps-page";

@Component({
  selector: 'mt-card',
  templateUrl: 'mt-card-component.html'
})
export class MtCardComponent {

  constructor(private readonly navCtrl: NavController) { }

  @Input() imgBackground: string = 'https://picsum.photos/150/150';
  @Input() title: string = 'CTM 2015 - Totally Enormous Extinct Dinosaurus, Greco-Roman';
  @Input() location: string = 'Berghain / Panorama Bar';
  @Input() date: string = 'Today 23:00 - 11:00';

  onCardClick() {
    this.navCtrl.push(MtMapsPage, { event });
  }
}
