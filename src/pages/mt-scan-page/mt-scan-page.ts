import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastProvider } from "../../providers/toast/toast";
import {Platform} from "ionic-angular";

@Component({
  selector: 'page-mt-scan',
  templateUrl: 'mt-scan-page.html',
})
export class MtScanPage {

  constructor(
    private readonly barcodeScanner: BarcodeScanner,
    private readonly toast: ToastProvider,
    private readonly platform: Platform) {
  }

  onScanCode() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.toast.showToast(barcodeData.text, 4000);
      }).catch(err => {
        this.toast.showToast(err);
      });
    } else {
      this.toast.showToast('Only works if you are using a cellphone');
    }
  }
}
