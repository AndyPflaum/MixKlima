import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedOrderService {

  constructor() { }

   private selectedOrderSubject = new BehaviorSubject<any>(null);

selectedOrder$ = new BehaviorSubject<any>(null);

  setSelectedOrder(order: any) {
    this.selectedOrderSubject.next(order);
  }

  clearSelectedOrder() {
    this.selectedOrderSubject.next(null);
  }
}
