import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class DataService {

  constructor(
    private readonly db: AngularFirestore) {
    // this.db.collection('events')
    //   .valueChanges()
    //   .subscribe(a => {
    //     console.log(a);
    //   });

    // this.db.collection('events')
    //   .snapshotChanges()
    //   .subscribe(a => {
    //     console.log(a);
    //   });
  }

  public setEntity(collection: string, entity: any) {
    return this.db.collection(collection).add(entity);
  }

  public updateEntity(params: { collection: string, key: string }, entity: any) {
    return this.db.doc(`/${ params.collection }/${ params.key }`)
      .update(entity);
  }

  public getEntity(params: { collection: string, key?: string, query?:any }) {
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
        .snapshotChanges()
        .map(res => {
          return res.map(a => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        }).subscribe(data => resolve(data ? data : false));
    });
  }

  public getEntities2(params: { collection: string, query?: ((ref: any) => any)}) {
      return this.db.collection(params.collection, params.query)
        .snapshotChanges()
        .map(res => {
          return res.map(a => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        });
  }

  public deleteEntity(params: { collection: string, key: string }) {
    return this.db.doc(`/${ params.collection }/${ params.key }`).delete();
  }
}
