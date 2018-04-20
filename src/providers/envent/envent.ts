import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";

import { EventInterface } from "../../interfaces/EventInterface";

@Injectable()
export class EnventProvider {

  constructor(
    private readonly db: AngularFirestore) {
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
