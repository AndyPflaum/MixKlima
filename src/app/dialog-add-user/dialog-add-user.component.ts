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
import { MatSelectChange } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, CommonModule, MatDialogModule, MatSelectModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  customerDate = new CustomerDate();
  aircons: any[] = []; // Liste aller Klimaanlagen aus Firebase
  selectedAirconName = ''; // Aktuell gewählter Name
  models: string[] = [];   // Modelle zur gewählten Klimaanlage
  selectedModel: string = '';

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadAircons();

  }

  onNoClick(): void {
    this.dialogRef.close();

  }
  async save() {
    this.customerDate.brand = this.selectedAirconName;
    this.customerDate.model = this.selectedModel;

    try {
      await this.firebaseService.saveCustomer(this.customerDate);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Kunden:', error);
    }
  }




  capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  loadAircons() {
    this.firebaseService.getAllAirConditionings().then(data => {
      this.aircons = data;
    }).catch(err => {
      console.error('Fehler beim Laden der Klimaanlagen:', err);
    });
  }


  onAirconSelected(event: MatSelectChange) {
    const selectedName = event.value;
    const found = this.aircons.find(a => a.name === selectedName);
    this.models = found?.models || [];
  }


}
