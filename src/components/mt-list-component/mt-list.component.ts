import { Component, Input } from '@angular/core';
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'mt-list',
  templateUrl: 'mt-list.component.html'
})
export class MtListComponent {

  private readonly  loader: any;

  constructor(private readonly loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });
    this.loader.present();

    if (this.data) {
      this.loader.dismissAll();
    }
  }

  @Input() data: any;
  @Input() errImg: string = 'https://picsum.photos/80/80';
  @Input() typeDate: string = 'shortTime';
}
