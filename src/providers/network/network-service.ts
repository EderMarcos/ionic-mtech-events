import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { Subscription } from "rxjs/Subscription";
import { Platform } from "ionic-angular";

import { ToastService } from "../toast/toast-service";

@Injectable()
export class NetworkService {

  private subscriptions: Subscription[] = [];
  private networkState: boolean;

  constructor(
    private readonly platform: Platform,
    private readonly toast: ToastService,
    private readonly network: Network) {
  }

  initNetworkWatch() {
    this.subscriptions.push(
      this.network.onDisconnect().subscribe(() => {
        setTimeout(() => {
          this.networkState = false;
          this.toast.showToast('Network lost, check your internet connection');
        }, 1500);
      })
    );
    this.subscriptions.push(
      this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          this.networkState = true;
          this.toast.showToast('Network restored');
        }, 3000);
      })
    );
  }

  onConnect() {
    return this.network.onConnect();
  }

  onDisconnect() {
    return this.network.onDisconnect();
  }

  isConnected(): boolean {
    if (this.platform.is('cordova')) {
      let conntype = this.network.type;
      return this.networkState !== undefined ? this.networkState : (conntype && conntype !== 'unknown' && conntype !== 'none');
    }
    return true;
  }

  unsuscribe() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
