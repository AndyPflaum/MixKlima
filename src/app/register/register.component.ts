import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseService } from '../firebase.service';
import { User } from '../../model/user.class';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatSelectModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  auth = inject(Auth);

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  username = '';
  firstName = '';
  lastName = '';
  password: string = '';
  isOffice: boolean | null = null;
  loading = false;
  errorMessage: string | null = null;
  successMessage = ''; // In der Component-Klasse hinzufügen

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  logIn(): void {
    this.router.navigate(['/login']);
  }


  async register() {
    const email = this.emailFormControl.value ?? '';
    const password = this.passwordFormControl.value ?? '';

    if (!email || !password) {
      this.errorMessage = '❌ E-Mail oder Passwort fehlt';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

    // ✅ Erstelle neues User-Objekt mit deiner Klasse
    const newUser = new User({
      name: this.lastName,
      vorname: this.firstName,
      email: email,
      office: this.isOffice ?? false,
      id: uid  // falls du `id` nutzen willst
    });

      // 🔽 In Firestore speichern
    await this.firebaseService.saveUser(uid, { ...newUser });
      console.log('✅ Benutzer-Daten gespeichert');

      // Felder zurücksetzen
      this.emailFormControl.reset();
      this.passwordFormControl.reset();
      this.firstName = '';
      this.lastName = '';
      this.isOffice = null;

      this.successMessage = '✅ Registrierung erfolgreich abgeschlossen!';
      setTimeout(() => {
        this.successMessage = '';
        this.logIn();
      }, 2000);

    } catch (error: any) {
      console.error('❌ Registrierung fehlgeschlagen:', error);
      this.errorMessage = '❌ Registrierung fehlgeschlagen: ' + error.message;
    }
  }

}
