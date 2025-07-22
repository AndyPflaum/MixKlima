import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatButtonModule,MatDividerModule,MatIconModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private router: Router) {}

logIn(): void {
  this.router.navigate(['/login']); 
}

}
