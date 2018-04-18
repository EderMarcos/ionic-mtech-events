import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(public navCtrl: NavController) { }

  private readonly events: any[] = [
    {
      name: "Conferencia 1",
      hourE: '12:05pm',
      hourS: '08:00am',
      title: 'La importancia de los animales',
      expositor: 'Juan Manuel Salazar'
    }, {
      name: "Conferencia 2",
      hourE: '07:05am',
      hourS: '09:00am',
      title: 'Green Peace',
      expositor: 'Marilu Sanches Gonzales'
    }, {
      name: "Conferencia 3",
      hourE: '09:10am',
      hourS: '11:00am',
      title: 'Open Source',
      expositor: 'Gilberto Contreras Austria'
    }
  ];

  goToDetail(event: any) {
    console.log(event);
  }
}
