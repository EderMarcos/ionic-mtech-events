import { Component } from '@angular/core';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-mt-about',
  templateUrl: 'mt-about-page.html',
})
export class MtAboutPage {

  private tabBarElement: any;

  constructor(private readonly inAppBrowser: InAppBrowser) { }

  openMail() {
    if ((navigator.platform.indexOf('iPhone') != -1) ||
      (navigator.platform.indexOf('iPad') != -1) ||
      (navigator.platform.indexOf('iPod') != -1)) {
      window.open('mailto:marketing@mtech-systems.com?subject=Users conferences contact', '_system');
    } else {
      window.open('mailto:marketing@mtech-systems.com?subject=Users conferences contact');
    }
  }

  openWebPage() {
    let browser = this.inAppBrowser.create('https://www.mtech-systems.com/');
  }

  ionViewWillEnter() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
    }
  }
}

