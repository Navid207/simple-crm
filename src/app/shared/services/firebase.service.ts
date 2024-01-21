import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  firestore: Firestore = inject(Firestore);


  constructor() { }


  getCollectionRef(colId: string) {
    return collection(this.firestore, colId);
  }


  async addNewUser(item: any) {
    let userRef = await addDoc(this.getCollectionRef("users"), item);
    return userRef.id;
  }



}
