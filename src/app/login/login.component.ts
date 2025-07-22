import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router'; // ✅ import hinzufügen


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField, MatLabel, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private router: Router) {}

   login() {
    console.log('Login mit:', this.email, this.password);
    // ggf. Navigation oder Auth-Logik hier
  }

  register(){
      this.router.navigate(['/register']);
  }

}
