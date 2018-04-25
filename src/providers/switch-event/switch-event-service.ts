import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../data/data-service";

@Injectable()
export class SwitchEventService {

  constructor(
    private readonly dataService: DataService) {
  }

  getCurrentEvent(events: EventInterface[]): Observable<EventInterface> {
    return new Observable<EventInterface>(observer => {
      for (let i = 0; i < events.length; i++) {
        this.getEventByDate2(events[i])
          .then((event: EventInterface) => observer.next(event))
      }
    });
  }

  getLastEvent(events: EventInterface[]): Observable<EventInterface> {
    return new Observable<EventInterface>(observer => {
      for (let i = 0; i < events.length; i++) {
        if (new Date().getTime() < events[i].endTime) {
          this.getEventByDate(events[i])
            .then((event: EventInterface) => observer.next(event))
        }
      }
    });
  }

  getEventByDate(event: EventInterface) {
    return new Promise(resolve => {
      setTimeout(() => {
        event.available = false;
        this.dataService.updateEntity({ collection: 'events', key: event.id }, event);
        resolve(event);
      }, Math.floor(event.endTime - new Date().getTime()));
    });
  }

  getEventByDate2(event: EventInterface) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(event);
      }, Math.floor(event.date - new Date().getTime()));
    });
  }
}
