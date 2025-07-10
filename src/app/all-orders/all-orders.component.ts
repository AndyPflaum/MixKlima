// src/app/all-orders/all-orders.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { SelectedOrderService } from '../selected-order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];
  ordersOriginal: any[] = [];
  visibleCount = 5;
  private ordersSub!: Subscription;
  selectedOrderId: string | null = null;

  unsubscribeFn: () => void = () => { };

  constructor(private firebase: FirebaseService, private selectedOrderService: SelectedOrderService, private router: Router) { }

  ngOnInit(): void {
    this.unsubscribeFn = this.firebase.listenToOrders((daten: any[]) => {
      const auftraegeMitDatum = daten.map((customer: any) => ({
        ...customer,
        createdAtDate: customer['createdAt']?.seconds
          ? new Date(customer['createdAt'].seconds * 1000)
          : null
      }));

      auftraegeMitDatum.sort(
        (a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime()
      );

      this.ordersOriginal = auftraegeMitDatum;
      this.updateVisibleOrders();
    });
  }



  logKundeId(customer: any): void {
    console.log('Kunden-ID:', customer.id);
  }

  selectKunde(customer: any) {
    this.selectedOrderService.setSelectedOrder(customer);
  }

  openDetails(customer: any) {
    if (customer?.id) {
      this.selectedOrderId = customer.id; // 👉 Hier speichern
      this.router.navigate(['/auftrag', customer.id]);
      this.selectedOrderService.setSelectedOrder(customer);
    } else {
      console.warn('Keine ID vorhanden:', customer);
    }
  }



  updateVisibleOrders() {
    this.orders = this.ordersOriginal.slice(0, this.visibleCount);
  }

  ngOnDestroy(): void {
    this.unsubscribeFn();
  }


}
