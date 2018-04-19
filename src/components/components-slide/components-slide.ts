import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsSlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-slide',
  templateUrl: 'components-slide.html'
})
export class ComponentsSlideComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsSlideComponent Component');
    this.text = 'Hello World';
  }

}
