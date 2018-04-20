import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(private readonly toastCtrl: ToastController) { }

  showToast(msg: string, duration: number = 2500, position: string = 'top') {
    let toast = this.toastCtrl.create({
      message: msg,
      duration,
      position
    });
    toast.present();
  }

}
