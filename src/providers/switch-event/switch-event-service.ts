import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../data/data-service";

@Injectable()
export class SwitchEventService {

  private events: EventInterface[];
  private observable: Observable<any>;
  private timer: number;

  constructor(
    private readonly dataService: DataService) {
    this.timer = 0;
  }

  setEvents(events: EventInterface[]) {
    this.events = events;
    let aux2 = new Date().getTime();
    console.log(aux2);
    for (let i = 0; i < this.events.length; i++) {
      if (aux2 < this.events[i].endTime) {
        console.log('Valido', this.events[i].eventName);
        this.timeOut(this.events[i]);
      } else {
        console.warn('No valido', this.events[i].eventName);
      }
    }
  }

  // getCurrentEvent(): Observable<EventInterface> {
    // console.log('Valido', this.events[i], ' : ', this.events[i].id);
    // console.log(Math.floor((this.events[i].endTime - now) / 1000));

    // const now = new Date().getTime();
    // if (this.events) {
      // this.observable = new Observable(observer => {
      //   let current = this.returnEvent(this.events.filter(f => f.available));
      //   this.timer = Math.floor((current.endTime - now) / 1000);
      //   let timeOut = setTimeout(() => {
      //     observer.next(current);
      //   }, this.timer);
      // });
    // }
    // return this.observable;
  // }

  returnEvent(events: EventInterface[]) {
    let entity: EventInterface;
    const now = new Date().getTime();
    for (let i = 0; i < events.length; i++) {
      if (now < events[i].endTime) {
        entity = events[i];
        entity.available = false;
        this.dataService.updateEntity({ collection: 'events', key: entity.id }, entity);
        return entity;
      }
    }
  }

  timeOut(event: EventInterface) {
    let timeOut = setTimeout(() => {
      console.log('Hola', event);
    }, Math.floor(event.endTime - new Date().getTime()));
  }
}
