import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { LoaderInterface } from "../../interfaces/loader-interface";

@Injectable()
export class LoaderService {

  private loader;

  constructor(private readonly loadingCtrl: LoadingController) { }

  showLoading(params: LoaderInterface) {
    this.loader = this.loadingCtrl.create({
      content: params.content,
      duration: params.duration,
      dismissOnPageChange: params.dismissOnPageChange
    });
    this.loader.present();
  }

  clear() {
    this.loader.dismissAll();
  }
}
