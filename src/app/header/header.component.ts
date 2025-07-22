import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogAddAirConditioningComponent } from '../dialog-add-air-conditioning/dialog-add-air-conditioning.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router'; // ✅ import hinzufügen
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
    this.showHeader = !this.router.url.includes('/login');
  });
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




}
