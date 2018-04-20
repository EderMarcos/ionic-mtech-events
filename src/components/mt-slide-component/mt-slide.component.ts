import { Component } from '@angular/core';

@Component({
  selector: 'components-slide',
  templateUrl: 'mt-slide.component.html'
})
export class MtSlideComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsSlideComponent Component');
    this.text = 'Hello World';
  }

}
