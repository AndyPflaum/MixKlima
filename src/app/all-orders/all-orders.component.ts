// src/app/all-orders/all-orders.component.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { SelectedOrderService } from '../selected-order.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { getAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteOrdersComponent } from '../dialog-delete-orders/dialog-delete-orders.component';


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
  isOfficeView = false;
  logginID = ""
  office = false;
  newNotification = new Audio('assets/sound/level-up-07-383747.mp3');
  audioUnlocked = false;
  // readonly dialog = Inject(MatDialog);

  unsubscribeFn: () => void = () => { };

  constructor(private firebase: FirebaseService, private selectedOrderService: SelectedOrderService, private router: Router, private dialog: MatDialog,) {

  }

  ngOnInit(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      this.firebase.getUserById(uid).then((userData: any) => {
        if (!userData) return;

        // Speichere UID für spätere Verwendung
        this.logginID = uid;
        this.office = userData.office;
        console.log('✅ Eingeloggt als:', userData.vorname, userData.name, userData.office);

        // 👉 Prüfung, ob office true ist
        if (userData.office === true) {
          console.log('✅ User hat Büro-Sicht');

          // hier kannst du z. B. eine Variable setzen:
          this.isOfficeView = true;
          this.playNotificationSound()
        } else {
          console.log('👤 User ist kein Büro-Mitarbeiter');
          this.isOfficeView = false;
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
      console.log("ist es gelesen?", customer.read);
    } else {
      console.warn('Keine ID vorhanden:', customer);


    }
  }
  handleClick(customer: any) {
    if (this.isUserOffice() && !customer.read) {
      this.firebase.updateCustomerReadStatus(customer.id, { read: true })
        .then(() => {
          customer.read = true;               // UI sofort updaten
          console.log('✅ Auftrag auf gelesen gesetzt');
        })
        .catch((err) => {
          console.error('❌ read-Update fehlgeschlagen:', err);
        });
    }

    this.openDetails(customer);
  }

  isUserOffice(): boolean {
    return !!this.office; // office ist jetzt boolean
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
    this.orders = [...this.ordersOriginal]
      .sort((a, b) => {
        // Erst nach read sortieren: false (ungelesen) zuerst
        if (a.read === b.read) {
          // Falls beide gleich gelesen/ungelesen → nach Datum sortieren
          return b.createdAtDate.getTime() - a.createdAtDate.getTime();
        }
        return a.read ? 1 : -1; // false = oben
      })
      .slice(0, this.visibleCount);
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


  playNotificationSound() {
    setTimeout(() => {
      this.newNotification.play();

    }, 500);
    console.log('Sound sollte abgespielt werden ');

  }

  unlockAudio() {
    this.newNotification.play().then(() => {
      this.audioUnlocked = true;
      this.newNotification.pause(); // direkt wieder stoppen
      this.newNotification.currentTime = 0;
      console.log('🔓 Audio entsperrt');
    }).catch(err => {
      console.warn('❌ Audio konnte nicht entsperrt werden:', err);
    });
  }

  openDeleteDialog(customer: any, event: MouseEvent) {
    event.stopPropagation(); // verhindert, dass openDetails() aus handleClick ausgelöst wird

    const dialogRef = this.dialog.open(DialogDeleteOrdersComponent, {
      width: '360px',
      data: customer // optional, falls du Kundendaten übergeben willst
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.updateVisibleOrders(); // Liste aktualisieren
      }
    });

  }

}
