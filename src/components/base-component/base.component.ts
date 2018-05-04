import { Subscription } from "rxjs/Subscription";
import { Platform } from "ionic-angular";
import { Network } from "@ionic-native/network";

import { ToastService } from "../../providers/toast/toast-service";

export abstract class BaseComponent {

  private subscriptions: Subscription[] = [];
  protected isOnline: boolean;

  protected constructor(
    protected readonly platform: Platform,
    protected readonly toast: ToastService,
    protected readonly network: Network) {
    this.initNetworkWatch();
  }

  initNetworkWatch() {
    this.isOnline = this.platform.is('cordova')
      ? (this.network.type !== 'unknown' && this.network.type !== 'none')
      : navigator.onLine;

    this.subscriptions.push(
      this.network.onDisconnect().subscribe(() => {
        if (this.isOnline) {
          this.isOnline = false;
          setTimeout(() => {
            console.log('onDisconnect!!!!!!!!');
            this.toast.showToast({ message: 'Network lost', duration: 3000, position: 'top' });
            this.onDisconnect();
          }, 2000);
        }
      })
    );

    this.subscriptions.push(
      this.network.onConnect().subscribe(() => {
        this.isOnline = true;
        setTimeout(() => {
          console.log('onConnect!!!!!!!!');
          this.toast.showToast({ message: 'Network restored', duration: 3000, position: 'top' });
          this.onConnect();
        }, 3000);
      })
    );
  }

  abstract onConnect(): void;
  abstract onDisconnect(): void;

  ionViewWillLeave() {
    console.log('Base componente leave');
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
