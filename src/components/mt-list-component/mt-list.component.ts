import { Component, Input } from '@angular/core';

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  constructor() { }

  @Input() data: any;
  @Input() errImg: string = 'https://picsum.photos/80/80';
  @Input() typeDate: string = 'shortTime';
}
