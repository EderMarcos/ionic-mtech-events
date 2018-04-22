import { Component } from '@angular/core';
import { MtEventPage_1Page } from "../../pages/mt-event-page-1/mt-event-page-1";
import { MtEventPage_3Page } from "../../pages/mt-event-page-3/mt-event-page-3";
import { MtEventPage_2Page } from "../../pages/mt-event-page-2/mt-event-page-2";

@Component({
  selector: 'mt-tabs',
  templateUrl: 'mt-tabs.component.html'
})
export class MtTabsComponent {

  tabDay1Page: any;
  tabDay2Page: any;
  tabDay3Page: any;

  constructor() {
    this.tabDay1Page = MtEventPage_1Page;
    this.tabDay2Page = MtEventPage_2Page;
    this.tabDay3Page = MtEventPage_3Page;
  }
}
