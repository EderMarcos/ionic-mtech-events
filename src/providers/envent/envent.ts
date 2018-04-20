import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Platform } from "ionic-angular";
// Todo hacer un servicio especia para storage
import { Storage } from '@ionic/storage';

import { EventInterface } from "../../interfaces/EventInterface";

@Injectable()
export class EnventProvider {

  private readonly headers: HttpHeaders;
  private readonly apiFirebase: string;

  constructor(
    private http: HttpClient,
    private readonly db: AngularFirestore,
    // private readonly storage: Storage,
    private readonly platform: Platform) {
    this.apiFirebase = 'https://mtech-34a4b.firebaseio.com/tracks';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.platform.is('cordova')) {
      console.log('Platform: Movil');
    } else {
      console.log('Platform: Web');
    }
  }

  public setEntity(collection: string, entity: EventInterface) {
    return this.db.collection(collection).add(entity);
  }

  public updateEntity(params: { collection: string, key: string }, entity: EventInterface) {
    return this.db.doc(`/${ params.collection }/${ params.key }`)
      .update(entity);
  }

  public getEntity(params: { collection: string, key: string, query?:any }) {
    return new Promise((resolve, _) => {
      this.db.doc(`/${ params.collection }/${ params.key }`)
        .valueChanges()
        .subscribe(data => {
          resolve(data ? data : false);
        });
    });
  }

  public getEntities(params: { collection: string, query?: ((ref: any) => any)}) {
    return new Promise((resolve, _) => {
      this.db.collection(params.collection, params.query)
        .valueChanges()
        .subscribe(data => {
          resolve(data ? data : false);
        });
    });
  }

  public deleteEntity(params: { collection: string, key: string }) {
    return this.db.doc(`/${ params.collection }/${ params.key }`).delete();
  }
}
