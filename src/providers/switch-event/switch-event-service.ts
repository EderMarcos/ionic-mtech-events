import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../data/data-service";

@Injectable()
export class SwitchEventService {

  private onNullEvent: EventInterface = {
    eventName: 'Coming soon',
    exhibitorName: 'MTech Systems',
    eventImg: 'https://picsum.photos/300/300',
    exhibitorImg: null,
    breakFast: false,
    day: null,
    description: null,
    latitude: 0,
    longitude: 0,
    place: null,
    available: true,
  };

  private mainTimeout;
  private afterEventTimeout;
  private readonly delay = 10 * 60 * 1000;

  constructor(
    private readonly dataService: DataService) {
  }

  getCurrentOrLastEvent(events: EventInterface[], lastEvent: boolean = false): Observable<EventInterface> {
    let now = new Date().getTime();
    return new Observable<EventInterface>(observer => {
      for (let i = 0; i < events.length; i++) {
        // If there are some events that are available
        if (now > events[i].endTime + this.delay && events[i].available) {
          events[i].available = false;
          events[i].surveyEnable = false;
          this.updateEvent(events[i]);
        }
        // At the start Event
        if (now < events[0].date) {
          observer.next(this.onNullEvent);
        }
        this.getEventByDate(events[i], lastEvent)
          .then((event: EventInterface) => observer.next(event))
        if (now > events[events.length - 1].endTime) {
          // At the end Event
          this.onNullEvent.eventName = 'Thanks for coming';
          observer.next(this.onNullEvent);
        }
      }
    });
  }

  getEventByDate(event: EventInterface, lastEvent: boolean) {
    return new Promise(resolve => {
      const now = new Date().getTime();
      // Current event
      if (!lastEvent && now > event.date && now < event.endTime) {
        return resolve(event);
      }
      // Timer
      let timer = Math.floor(lastEvent ? event.endTime - new Date().getTime() : event.date - new Date().getTime());
      this.mainTimeout = setTimeout(() => {
        if (lastEvent) {
          event.surveyEnable = event.available;
          this.updateEvent(event);
        }
        resolve(event);
      }, timer);
      // Only last event
      if (lastEvent) {
        // Time that the survey will be available
        this.afterEventTimeout = setTimeout(() => {
          event.available = false;
          event.surveyEnable = false;
          this.updateEvent(event);
          resolve(event);
        }, timer + this.delay);
      }
    });
  }

  clearTimeout() {
    clearTimeout(this.mainTimeout);
    clearTimeout(this.afterEventTimeout);
  }

  updateEvent(data: EventInterface) {
    this.dataService.updateEntity({ collection: 'events', key: data.id }, data);
  }
}
