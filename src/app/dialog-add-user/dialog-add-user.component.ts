import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomerDate } from '../../model/customerData.class';
import { FirebaseService } from '../firebase.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  customerDate = new CustomerDate();
  models: string[] = [''];

  constructor(private firebaseService: FirebaseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // addModel() {
  //   this.models.push(''); // Neues leeres Input-Feld hinzufügen
  // }

  // removeModel(index: number) {
  //   this.models.splice(index, 1); // Optional: Entfernen eines Feldes
  // }

  async save() {
    try {
      // Optional: Modelle (z. B. als zusätzliche Daten) anhängen
      // this.customer.models = this.models;

      await this.firebaseService.saveCustomer(this.customerDate);
      console.log('Kunde erfolgreich gespeichert.', this.customerDate);

      this.dialogRef.close(true); // Dialog schließen, true = Erfolg
    } catch (error) {
      console.error('Fehler beim Speichern des Kunden:', error);
    }
  }

}
