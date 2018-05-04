import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController} from "ionic-angular";

import { StorageService } from "../../providers/storage/storage-service";
import { UserInterface } from "../../interfaces/user-interface";
import { MtTabsComponent } from "../../components/mt-tabs-component/mt-tabs.component";
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
  private tabBarElement: any;

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
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{2,3}$')])
    });
  }

  onSubmit() {
    this.user.email = this.form.value.email;
    this.loader.showLoading({ content: 'Please wait!', duration: 0 });
    this.dataService.getEntities({
      collection: 'users',
      query: (ref) => ref.where('email', '==', this.user.email)
    }).subscribe((users: UserInterface[]) => {
      this.loader.clear();
      if (users[0]) {
        this.user = users[0];
        this.storage.setEntity('user', JSON.stringify(this.user));
        if (this.navCtrl.getViews().length > 1) {
          this.navCtrl.pop();
        } else {
          this.navCtrl.push(MtTabsComponent);
        }
      }
       else {
        this.alert.showAlert({ title: 'Failed to login', subTitle: 'This email does not have permissions' })
      }
    });
  }

  ionViewWillEnter() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
    }
  }
}
