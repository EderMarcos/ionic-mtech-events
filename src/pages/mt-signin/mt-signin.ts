import { Component } from '@angular/core';

import { StorageService } from "../../providers/storage/storage";
import { UserInterface } from "../../interfaces/userInterface";
import { MtTabsComponent } from "../../components/mt-tabs-component/mt-tabs.component";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-mt-signin',
  templateUrl: 'mt-signin.html',
})
export class MtSigninPage {

  private user: UserInterface;

  constructor(
    private readonly storage: StorageService,
    private readonly navCtrl: NavController) {
    this.user = {
      email: null
    };
  }

  onSubmit() {
    this.storage.setEntity('user', JSON.stringify(this.user));
    this.navCtrl.push(MtTabsComponent);
  }

}
