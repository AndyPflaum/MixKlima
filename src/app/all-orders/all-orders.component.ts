// src/app/all-orders/all-orders.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { SelectedOrderService } from '../selected-order.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { getAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];
  ordersOriginal: any[] = [];
  visibleCount = 5;
  selectedOrderId: string | null = null;
  isGuest = false;
  isOfficeView = false;

  unsubscribeFn: () => void = () => { };

  constructor(private firebase: FirebaseService, private selectedOrderService: SelectedOrderService, private router: Router) { }

  ngOnInit(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
    const uid = user.uid;
    this.firebase.getUserById(uid).then((userData: any) => {
      if (
        userData?.vorname?.toLowerCase() === 'gast' &&
        userData?.name?.toLowerCase() === 'gast'
      ) {
        this.isGuest = true;
      }
    });
  }

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
      // Separat prüfen, ob gelöscht werden soll
      this.handleGuestAutoDelete(customer);
    } else {
      console.warn('Keine ID vorhanden:', customer);
    }
  }

  handleGuestAutoDelete(customer: any): void {
    if (customer.guestLoggedIn) {
      console.warn('Gastauftrag erkannt – wird in 5 Minuten gelöscht');

      setTimeout(() => {
        this.deleteGuestOrder(customer.id);
      }, 5000); // 5 Minuten

    }
  }

  deleteGuestOrder(orderId: string): void {
    this.firebase.deleteOrder(orderId).then(() => {
      console.log(`✅ Gastauftrag mit ID ${orderId} wurde gelöscht`);
      this.updateVisibleOrders();
    }).catch(err => {
      console.error('Fehler beim Löschen des Gastauftrags:', err);
    });
  }


  updateVisibleOrders() {
    this.orders = this.ordersOriginal.slice(0, this.visibleCount);
  }

  ngOnDestroy(): void {
    this.unsubscribeFn();
  }

  deleteOrders(customer: any, event: MouseEvent) {
    event.stopPropagation(); // Verhindert, dass openDetails() auch ausgeführt wird
    if (confirm(`Möchtest du den Auftrag von ${customer.name} ${customer.vorname} wirklich löschen?`)) {
      this.firebase.deleteOrder(customer.id).then(() => {
        console.log('✅ Auftrag gelöscht:', customer.id);
        this.updateVisibleOrders(); // falls notwendig
      }).catch(err => {
        console.error('Fehler beim Löschen des Auftrags:', err);
      });
    }
  }


}
