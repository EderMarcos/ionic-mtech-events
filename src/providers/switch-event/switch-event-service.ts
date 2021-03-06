import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EventInterface } from "../../interfaces/event-interface";
import { DataService } from "../data/data-service";

@Injectable()
export class SwitchEventService {

  // private customEvent: EventInterface = {
  //   eventName: 'Coming soon',
  //   exhibitorName: 'MTech Systems',
  //   eventImg: 'https://picsum.photos/300/300/?image=1075&blur',
  //   exhibitorImg: null,
  //   breakFast: false,
  //   day: null,
  //   description: null,
  //   latitude: 0,
  //   longitude: 0,
  //   place: null,
  //   available: true,
  // };

  private customInterval;
  private readonly delay = 10 * 60 * 1000;

  constructor(
    private readonly dataService: DataService) {
  }

  getCurrentOrLastEvent(events: EventInterface[]): Observable<EventInterface> {
    return new Observable<EventInterface>(obs => {
      if (events.length > 0) {
        // let interval = setInterval(() => {

          let now = new Date().getTime();
          // if (now < events[0].date) {
          //   return obs.next(this.customEvent);
          // }

          events.forEach((ev, id) => {
            if (ev.available && now > ev.endTime) {
              // if (ev.breakFast) {
                ev.available = false;
                obs.next(ev);
                return this.updateEvent(ev);
                // return this.updateEvent(ev);
              // }
              // if (!ev.surveyEnable && !ev.breakFast) {
              //   ev.available = false;
                // ev.surveyEnable = true;
              // }
              // if (ev.endTime + this.delay && !ev.breakFast) {
              //   ev.surveyEnable = false;
              //   return this.updateEvent(ev);
              // }
              // if (new Date(now).getDay() <= new Date(ev.endTime).getDay() && !ev.available) {
              //   console.log('Final', ev.eventName);
              //   this.customEvent.eventName = 'Thanks for comming today';
              //   obs.next(this.customEvent);
              // }
            }
            if (now > ev.date && now < ev.endTime) {
              return obs.next(ev);
            }
          });

          // if (now > events[events.length - 1].endTime) {
          //   // clearInterval(interval);
          //   this.customEvent.eventName = 'Thanks for comming';
          //   obs.next(this.customEvent);
          //   return obs.complete();
          // }


        // }, 1000);
      } else {
        obs.complete();
      }
    });
  }

  clear() {
    clearInterval(this.customInterval);
  }

  updateEvent(data: EventInterface) {
    this.dataService.updateEntity({ collection: 'events', key: data.id }, data);
  }
}
