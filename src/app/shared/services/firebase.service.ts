import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, query, orderBy, doc } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  users!: UserData[];
  user!: UserData;

  firestore: Firestore = inject(Firestore);

  constructor() { }


  subUsers() {
    let ref = this.getCollectionRef('users');
    return onSnapshot(ref, (users) => {
      this.users = [];
      users.docs.forEach(element => { this.users.push(this.fillUserData(element)) })
    })
  }


  getCollectionRef(colId: string) {
    return collection(this.firestore, colId);
  }


  fillUserData(docs: any): UserData {
    let user: UserData = {
      id: docs.id,
      firstName: docs.data().firstName || '',
      lastName: docs.data().lastName || '',
      street: docs.data().street || '',
      zipCode: docs.data().zipCode || NaN,
      city: docs.data().city || '',
      mail: docs.data().mail || '',
      phone: docs.data().phone || NaN,
      birthDate: docs.data().birthDate || NaN,
    }
    return user
  }


  async addNewUser(item: any) {
    let userRef = await addDoc(this.getCollectionRef("users"), item);
    return userRef.id;
  }


  subUser(id: string) {
    let ref = this.getSingleDocRef('users', id);
    return onSnapshot(ref, (user) => { 
      this.user = this.fillUserData(user);
    })
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
