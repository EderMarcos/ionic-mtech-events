import { Component } from '@angular/core';
import { HomePage } from "../../pages/home/home";
import { AboutPage } from "../../pages/about/about";

@Component({
  selector: 'components-tabs',
  templateUrl: 'components-tabs.html'
})
export class MtTabsComponent {

  tabHomePage: any;
  tabAboutPage: any;

  constructor() {
    this.tabHomePage = HomePage;
    this.tabAboutPage = AboutPage;
  }
}
