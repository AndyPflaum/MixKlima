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

  constructor(private router: Router) { }

  logIn(): void {
    this.router.navigate(['/login']);
  }


async register() {
  const email = this.emailFormControl.value ?? '';
  const password = this.passwordFormControl.value ?? '';

  if (!email || !password) {
    console.error('❌ E-Mail oder Passwort fehlt');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log('✅ Registrierung erfolgreich:', userCredential.user);

    // Felder zurücksetzen
    this.emailFormControl.reset();
    this.passwordFormControl.reset();

    // Erfolgsmeldung anzeigen
    this.successMessage = '✅ Registrierung erfolgreich abgeschlossen!';

    // Optional: Meldung nach 5 Sekunden wieder ausblenden
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);

  } catch (error) {
    console.error('❌ Registrierung fehlgeschlagen:', error);
  }
  this.logIn();
}





}
