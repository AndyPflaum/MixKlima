import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-air-conditioning',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './dialog-add-air-conditioning.component.html',
  styleUrl: './dialog-add-air-conditioning.component.scss'
})
export class DialogAddAirConditioningComponent {
    readonly dialogRef = inject(MatDialogRef<DialogAddAirConditioningComponent>);
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    console.log('Wird noch nocht in firebase gespeichert !');
    this.onNoClick();
    
  }

}
