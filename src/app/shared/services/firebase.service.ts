import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data';


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


  users!: UserData[];


  subUsers() {
    let usersRef = this.getCollectionRef('users');
    let users: UserData[] = [];
    onSnapshot(
      usersRef,
      (snapshot: any) => {
        for (let i = 0; i < snapshot.docs.length; i++) {
          users.push(this.fillUserData(snapshot.docs[i]));
        }
      })
    return users
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



}
