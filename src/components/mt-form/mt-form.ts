import { Component } from '@angular/core';

/**
 * Generated class for the MtFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mt-form',
  templateUrl: 'mt-form.html'
})
export class MtFormComponent {

  text: string;

  constructor() {
    console.log('Hello MtFormComponent Component');
    this.text = 'Hello World';
  }

}
