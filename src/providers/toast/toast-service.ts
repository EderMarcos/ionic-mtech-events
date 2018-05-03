import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { ToastInterface } from "../../interfaces/toast-interface";

@Injectable()
export class ToastService {

  constructor(private readonly toastCtrl: ToastController) { }

  showToast(params: ToastInterface) {
    this.toastCtrl.create({
      message: params.message,
      duration: params.duration || 2500,
      position: params.position || 'top',
      showCloseButton: params.showCloseButton,
      closeButtonText: params.closeButtonText,
      dismissOnPageChange: params.dismissOnPageChange,
    }).present();
  }

}
