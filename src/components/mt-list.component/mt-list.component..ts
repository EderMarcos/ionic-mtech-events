import { Component } from '@angular/core';

@Component({
  selector: 'components-mt-list',
  templateUrl: 'mt-list.component.html'
})
export class ComponentsMtListComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsMtListComponent Component');
    this.text = 'Hello World';
  }

}
