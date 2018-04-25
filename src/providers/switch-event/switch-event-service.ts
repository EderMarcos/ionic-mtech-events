import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../data/data-service";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Platform } from "ionic-angular";
import { ToastService } from "../toast/toast-service";

@Injectable()
export class SwitchEventService {

  private onNullEvent: EventInterface = {
    eventName: 'Coming soon',
    exhibitorName: null,
    eventImg: null,
    exhibitorImg: null,
    breakFast: false,
    day: null,
    description: null,
    latitude: 0,
    longitude: 0,
    place: null,
    available: true,
  };

  constructor(
    private readonly dataService: DataService,
    private readonly platform: Platform,
    private readonly toast: ToastService,
    private readonly backgroundMode: BackgroundMode,) {
  }

  getCurrentOrLastEvent(events: EventInterface[], lastEvent: boolean = false): Observable<EventInterface> {
    let now = new Date().getTime();
    return new Observable<EventInterface>(observer => {
      for (let i = 0; i < events.length; i++) {
        if (now > events[events.length - 1].endTime) {
          // At the end Event
          observer.next(this.onNullEvent);
          return observer.complete();
        }
        if (now < events[0].date) {
          // At the start Event
          observer.next(this.onNullEvent);
        }
        if (now > events[i].endTime && events[i].available) {
          events[i].available = false;
          this.dataService.updateEntity({ collection: 'events', key: events[i].id }, events[i]);
        } else {
          this.getEventByDate(events[i], lastEvent)
            .then((event: EventInterface) => observer.next(event))
        }
      }
    });
  }

  getEventByDate(event: EventInterface, lastEvent: boolean) {
    return new Promise(resolve => {
      const now = new Date().getTime();
      if (!lastEvent && now > event.date && now < event.endTime) {
        return resolve(event);
      }
      let timer = Math.floor(lastEvent ? event.endTime - new Date().getTime() : event.date - new Date().getTime());
      setTimeout(() => {
        if (lastEvent) {
          event.available = false;
          this.dataService.updateEntity({ collection: 'events', key: event.id }, event);
        }
        resolve(event);
      }, timer);
    });
  }
}
