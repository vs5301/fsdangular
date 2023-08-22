import { Inject, Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, DocumentData, Query, query, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common'
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  app: FirebaseApp
  codeModelSubject = new BehaviorSubject<any[]>([])

  constructor( 
    @Inject(DOCUMENT) private _doc: Document,
    private firestore: Firestore ) {
      this.app = initializeApp(environment.firebase)
     }

  getWindowRef = (): Window => this._doc.defaultView as Window
  getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => collection(this.firestore, collectionName)
  getQueryRef(collectionName: string): Query<DocumentData>{
    let queryRef: Query = query(
      this.getCollectionRef(collectionName)
    )
    return queryRef
  }

  public get timeoutInterval(){
    return 10000
  }

  public onLoad() {
    this.getCodeList();
  }

  getCodeList(){
    let queryRef = query(this.getQueryRef("promo-codes"))

    const unsub = onSnapshot(queryRef, (snapshot) => {
      this.codeModelSubject.next(snapshot.docs.map((e) => {
        return e.data()
      }))
      this.getWindowRef().setTimeout(() => unsub(), this.timeoutInterval * 6)
    })
  }

}
