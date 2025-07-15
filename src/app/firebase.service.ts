import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  onSnapshot, where,
  setDoc,deleteDoc
} from '@angular/fire/firestore';
import { CustomerDate } from '../model/customerData.class';


@Injectable({
  providedIn: 'root',
})

export class FirebaseService {
  constructor(private firestore: Firestore) { }

  ordersInFirebase = collection(this.firestore, 'auftraege')
  airConditionInFirebase = collection(this.firestore, 'airConditioning')

  async saveCustomer(customer: CustomerDate) {
    const customerObj = {
      ...customer,
      createdAt: customer.createdAt || new Date(),
    };

    const collectionRef = this.ordersInFirebase;
    await addDoc(collectionRef, customerObj);
  }

  async saveAirConditioning(aircon: any): Promise<void> {
    const collectionRef = this.airConditionInFirebase;

    const airconData = {
      ...aircon,
      createdAt: new Date()
    };

    await addDoc(collectionRef, airconData);
  }

  async isAirconNameTaken(name: string): Promise<boolean> {
    const colRef = collection(this.firestore, 'airConditioning');
    const q = query(colRef, where('name', '==', name));
    const snapshot = await getDocs(q);
    return !snapshot.empty; // true = Name schon vorhanden
  }

  async getAirconByName(name: string): Promise<any | null> {
    const colRef = collection(this.firestore, 'airConditioning');
    const q = query(colRef, where('name', '==', name));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }

    return null;
  }

  async updateAirconModels(id: string, models: string[]): Promise<void> {
    const docRef = doc(this.firestore, 'airConditioning', id);
    await setDoc(docRef, { models }, { merge: true });
  }

  listenToOrders(callback: (orders: any[]) => void): () => void {
    const colRef = this.ordersInFirebase;
    const q = query(colRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(orders);
    });

    return unsubscribe;
  }


  async getOrders(): Promise<any[]> {
    const auftraegeCol = this.ordersInFirebase;
    const snapshot = await getDocs(auftraegeCol);
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return list;
  }

  async getOrderById(id: string): Promise<any> {
    const docRef = doc(this.firestore, 'auftraege', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        ...data,
        createdAtDate: data['createdAt']?.seconds
          ? new Date(data['createdAt'].seconds * 1000)
          : null
      };
    } else {
      throw new Error('Dokument nicht gefunden');
    }
  }

  async getAllAirConditionings(): Promise<any[]> {
    const snapshot = await getDocs(this.airConditionInFirebase);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async getAircons(): Promise<any[]> {
    const snapshot = await getDocs(this.airConditionInFirebase);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteOrder(id: string): Promise<void> {
  const docRef = doc(this.firestore, 'auftraege', id);
  await deleteDoc(docRef);
}




}
