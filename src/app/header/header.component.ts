import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogAddAirConditioningComponent } from '../dialog-add-air-conditioning/dialog-add-air-conditioning.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router'; // ✅ import hinzufügen
import { CommonModule } from '@angular/common';
import { getAuth, signOut } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from '../firebase.service';
import { Auth } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly auth = inject(Auth);
  showHeader = true;
  initials: string = '';
  logOutOben = false;
  constructor(private router: Router, public firebase: FirebaseService) {
    this.router.events.subscribe(() => {
      this.showHeader = !this.router.url.includes('/login');
    });
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const userData = await this.firebase.getUserData(user.uid);
        if (userData) {
          this.initials = this.getInitials(userData.vorname, userData.name);
        }
      }
    });
  }

  getInitials(vorname: string, nachname: string): string {
    const v = vorname?.charAt(0).toUpperCase() || '';
    const n = nachname?.charAt(0).toUpperCase() || '';
    return `${v}.${n}`; // Mittlerer Punkt (ALT + 250 oder einfach kopieren)
  }

  openDialogNewUsers(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        // this.animal.set(result);
      }
    });
  }

  openDialogNewAirConditioning(): void {
    const dialogRef = this.dialog.open(DialogAddAirConditioningComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        // this.animal.set(result);
      }
    });
  }

  logIn(): void {
    this.router.navigate(['/login']); // ✅ Navigiere zur Login-Seite

  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('✅ Erfolgreich ausgeloggt');
      this.firebase.menuSelectionIsOpen = false;
      this.router.navigate(['/login']); // Zurück zur Login-Seite
    }).catch((error) => {
      console.error('❌ Fehler beim Ausloggen:', error);
    });
  }

  lockOutIsOben() {
    this.logOutOben = !this.logOutOben;
  }

  openMenuSelection() {
    this.firebase.menuSelectionIsOpen = !this.firebase.menuSelectionIsOpen;
    if (!this.logOutOben) {
      this.lockOutIsOben();
    }
    this.lockOutIsOben();
    console.log(' mesnu ist auf ', this.firebase.menuSelectionIsOpen);

  }

}
