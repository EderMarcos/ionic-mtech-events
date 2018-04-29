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
    return new Promise(resolve => {
      if (!this.platform.is('cordova')) {
        return resolve(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : false)
      }
      this.storage.get(key)
        .then(data => resolve(data ? JSON.parse(data) : false));
    });
  }

  clear(key: string) {
    return new Promise(resolve => {
      if (!this.platform.is('cordova')) {
        return resolve(localStorage.removeItem(key) as any);
      }
      resolve(this.storage.remove(key));
    });
  }
}
