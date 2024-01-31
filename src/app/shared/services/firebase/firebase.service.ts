import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UserData } from '../../interfaces/user-data';
import { CompanyData } from '../../interfaces/company-data';
import { ListData } from '../../interfaces/list-data';


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

  companies!: CompanyData[];
  company: CompanyData = {
    name: '',
    street: '',
    no: '',
    zipCode: NaN,
    city: '',
    country: '',
    sector: '',
    contacts: [],
    assigned: []
  }

  sectors!: ListData[];
  departments!: ListData[];

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

  subCompanies(order: string | undefined) {
    let q;
    if (order) q = query(this.getCollectionRef("companies"), orderBy(order));
    else q = query(this.getCollectionRef("companies"))
    return onSnapshot(q, (companies) => {
      this.companies = [];
      companies.docs.forEach(element => { this.companies.push(this.fillCompanyData(element)) })
    })
  }

  subSectors() {
    let q = query(this.getCollectionRef("sector"), orderBy('name'));
    return onSnapshot(q, (sectors) => {
      this.sectors = [];
      sectors.docs.forEach(element => { this.pushToName(element, 'sector') })
    })
  }


  subDepartments() {
    let q = query(this.getCollectionRef("department"), orderBy('name'));
    return onSnapshot(q, (departments) => {
      this.departments = [];
      departments.docs.forEach(element => { this.pushToName(element, 'department') })
    })
  }


  pushToName(doc: any, collId: 'sector' | 'department') {
    let data: ListData = { name: '', id: '' };
    if (!doc.data().name) return
    data.name = doc.data().name;
    data.id = doc.id;
    if (doc.data().name && collId === 'sector') this.sectors.push(data)
    else if (collId === 'department') this.departments.push(data)
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


  fillCompanyData(docs: any): CompanyData {
    let company: CompanyData = {
      id: docs.id,
      name: docs.data().name || '',
      sector: docs.data().sector || '',
      street: docs.data().street || '',
      no: docs.data().no || NaN,
      zipCode: docs.data().zipCode || '',
      city: docs.data().city || '',
      country: docs.data().country || '',
      contacts: docs.data().contacts || [],
      assigned: docs.data().assigned || [],
    }
    return company
  }


  async addNewElement(collRef: string, item: any) {
    let userRef = await addDoc(this.getCollectionRef(collRef), item);
    return userRef.id;
  }


  subUser(id: string) {
    let ref = this.getSingleDocRef('users', id);
    return onSnapshot(ref, (user) => {
      this.user = this.fillUserData(user);
    })
  }


  subCompany(id: string) {
    let ref = this.getSingleDocRef('companies', id);
    return onSnapshot(ref, (company) => {
      this.company = this.fillCompanyData(company);
    })
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  async updateUserData(user: UserData) {
    if (!user.id) return
    let json = this.getCleanUserJson(user);
    await updateDoc(this.getSingleDocRef('users', user.id), json).catch(
      (err) => { console.error(err) }
    ).then();
  }


  async updateListData(collID: string, id: string, json: {}) {
    if (!collID || !id || !json) return
    await updateDoc(this.getSingleDocRef(collID, id), json).catch(
      (err) => { console.error(err) }
    ).then();
  }


  getCleanUserJson(user: UserData) {
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
