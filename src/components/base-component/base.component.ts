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
        this.isOnline = false;
        this.onDisconnect();
        this.toast.showToast({ message: 'Network lost', duration: 3000 });
      })
    );

    this.subscriptions.push(
      this.network.onConnect().subscribe(() => {
        this.isOnline = true;
        this.onConnect();
        this.toast.showToast({ message: 'Network restored', duration: 3000 });
      })
    );
  }

  abstract onConnect(): void;
  abstract onDisconnect(): void;

  ionViewWillLeave() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
