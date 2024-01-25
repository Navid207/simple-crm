import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UserData } from '../../interfaces/user-data';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  users!: UserData[];
  user: UserData = {
    firstName: '',
    lastName: '',
    street: '',
    zipCode: NaN,
    city: '',
    mail: '',
    phone: NaN,
    birthDate: NaN,
  };

  firestore: Firestore = inject(Firestore);

  constructor() { }


  subUsers(order: string | undefined) {
    let q;
    if (order) q = query(this.getCollectionRef("users"), orderBy(order));
    else q = query(this.getCollectionRef("users"))
    return onSnapshot(q, (users) => {
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


  async updateUserData(user: UserData) {
    if (!user.id) return
    let json = this.getCleanJson(user);
    await updateDoc(this.getSingleDocRef('users', user.id), json).catch(
      (err) => { console.error(err) }
    ).then();
  }


  getCleanJson(user: UserData) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
      mail: user.mail,
      phone: user.phone,
      birthDate: user.birthDate,
    }
  }


  async delete(id: string, colId: string) {
    if (!id) return
    await deleteDoc(this.getSingleDocRef(colId, id)).catch(
      (err) => { console.error(err) }
    ).then();
  }

}
