import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class StorageService {

  constructor(
    private readonly platform: Platform,
    private readonly storage: Storage) {}

  setEntity(key: string, entity: string) {
    if (this.platform.is('cordova')) {
      this.storage.set(key, entity);
    } else {
      localStorage.setItem(key, entity);
    }
  }

  getEntity(key: string) {
    return new Promise(resolve => resolve(this.platform.is('cordova') ? this.storage.get(key) : localStorage.getItem(key)));
  }
}
