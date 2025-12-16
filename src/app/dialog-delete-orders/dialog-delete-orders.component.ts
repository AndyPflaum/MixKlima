import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from '../firebase.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-delete-orders',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogModule,MatIconModule],
  templateUrl: './dialog-delete-orders.component.html',
  styleUrl: './dialog-delete-orders.component.scss'
})
export class DialogDeleteOrdersComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteOrdersComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);     // <-- hier kommt dein 'customer' an

  constructor(private firebase: FirebaseService){}
  onNoClick(): void { this.dialogRef.close('cancel'); }   // <-- string zurück
  confirm(): void { this.dialogRef.close('confirm'); }

   async deleteOrder(): Promise<void> {
    try {
      await this.firebase.deleteOrder(this.data.id);
      this.dialogRef.close('deleted'); // oder 'confirm'
    } catch (err) {
      console.error('❌ Fehler beim Löschen:', err);
    }
  }

}
