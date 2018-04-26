import { Component } from '@angular/core';

@Component({
  selector: 'page-mt-about',
  templateUrl: 'mt-about-page.html',
})
export class MtAboutPage {

  constructor() {
    console.log('[EderConsole] Console');

    // setTimeout(() => {
    //   console.log('Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // }, 2*60*1000);
  }
}
