import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { StorageService } from "../../providers/storage/storage-service";
import { UserInterface } from "../../interfaces/user-interface";
import { MtTabsComponent } from "../../components/mt-tabs-component/mt-tabs.component";
import { NavController } from "ionic-angular";
import { AlertService } from "../../providers/alert/alert-service";
import { DataService } from "../../providers/data/data-service";
import { LoaderService } from "../../providers/loader/loader-service";

@Component({
  selector: 'page-mt-signin',
  templateUrl: 'mt-signin.html',
})
export class MtSigninPage {

  private user: UserInterface;
  private form: FormGroup;

  constructor(
    private readonly storage: StorageService,
    private readonly alert: AlertService,
    private readonly loader: LoaderService,
    private readonly dataService: DataService,
    private readonly navCtrl: NavController) {
    this.user = {
      email: null
    };
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,3}$')])
    })
  }

  onSubmit() {
    this.user.email = this.form.value.email;
    this.loader.showLoading({ content: 'Please wait!', duration: 0 });
    this.dataService.getEntities({
      collection: 'users',
      query: (ref) => ref.where('email', '==', this.user.email)})
      .then(users => {
        this.loader.clear();
        return users[0];
      })
      .then(user => {
        if (user) {
          this.user = user;
          this.storage.setEntity('user', JSON.stringify(this.user));
          this.navCtrl.push(MtTabsComponent);
        } else {
          this.alert.showAlert({ title: 'Failed to login', subTitle: 'This email does not have permissions' })
        }
      });
  }
}
