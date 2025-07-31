import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signInAnonymously } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField, MatLabel, MatFormFieldModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = '';

  private auth = inject(Auth); // ✅ richtiger Weg

  constructor(private router: Router) {}

  async login() {
    this.loginError = '';
    try {
      const result = await signInWithEmailAndPassword(this.auth, this.email, this.password); // ✅
      console.log('✅ Eingeloggt als:', result.user.email);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('❌ Fehler beim Login:', error);
      this.loginError = '❌ Login fehlgeschlagen. Überprüfe deine Eingaben.';
    }
  }

  register() {
    this.router.navigate(['/register']);
  }




}
