import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";

import { ActionSheetInterface } from "../../interfaces/action-sheet-interface";

@Injectable()
export class ActionSheetService {

  constructor(
    private readonly actionSheetCtrl: ActionSheetController) {}

  show(params: ActionSheetInterface) {
    this.actionSheetCtrl.create({
      title: params.title,
      buttons: params.buttons
    }).present();
  }
}
