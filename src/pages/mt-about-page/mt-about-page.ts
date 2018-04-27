import { Component } from '@angular/core';

@Component({
  selector: 'page-mt-about',
  templateUrl: 'mt-about-page.html',
})
export class MtAboutPage {

  private tabBarElement: any;

  constructor() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
}

