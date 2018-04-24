import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AlertInterface } from "../../interfaces/alert-interface";

@Injectable()
export class AlertService {

  constructor(private readonly alertCtrl: AlertController) { }

  showAlert(params: AlertInterface) {
    this.alertCtrl.create({
      title: params.title,
      subTitle: params.subTitle,
      buttons: params.buttons || ['OK']
    }).present();
  }

  showPrompt(params: AlertInterface) {
    this.alertCtrl.create({
      title: params.title,
      message: params.message,
      inputs: params.inputs,
      buttons: params.buttons
    }).present();
  }

  showConfirm(params: AlertInterface) {
    this.alertCtrl.create({
      title: params.title,
      message: params.message,
      buttons: params.buttons
    }).present();
  }

  showRadio(params: AlertInterface) {
    this.alertCtrl.create({
      title: params.title,
      inputs: params.inputs,
      buttons: params.buttons
    }).present();
  }
}
