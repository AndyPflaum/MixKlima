import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-add-air-conditioning',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './dialog-add-air-conditioning.component.html',
  styleUrl: './dialog-add-air-conditioning.component.scss'
})
export class DialogAddAirConditioningComponent {
    readonly dialogRef = inject(MatDialogRef<DialogAddAirConditioningComponent>);
   aircon = {
    name: '',
    models: ['']
  };
  constructor(private firebaseService:FirebaseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

save(): void {
  this.firebaseService.getAirconByName(this.aircon.name).then(existingAircon => {
    if (existingAircon) {
      // ✅ Name existiert – Modelle anhängen
      const updatedModels = Array.from(new Set([
        ...existingAircon.models,
        ...this.aircon.models
      ]));

      this.firebaseService.updateAirconModels(existingAircon.id, updatedModels).then(() => {
        this.dialogRef.close();
      }).catch(err => {
        console.error('Fehler beim Aktualisieren der Klimaanlage:', err);
      });

    } else {
      // ➕ Neuer Eintrag
      this.firebaseService.saveAirConditioning(this.aircon).then(() => {
        this.dialogRef.close();
      }).catch(err => {
        console.error('Fehler beim Speichern der Klimaanlage:', err);
      });
    }
  }).catch(err => {
    console.error('Fehler bei der Namensprüfung:', err);
  });
}



  addModel() {
    this.aircon.models.push('');
  }

  trackByIndex(index: number, item: any): number {
  return index;
}

}
