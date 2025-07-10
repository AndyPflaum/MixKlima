import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  onSnapshot
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



}
