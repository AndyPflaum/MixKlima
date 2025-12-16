import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-imprint-and-data-protection',
  standalone: true,
  imports: [ ],
  templateUrl: './imprint-and-data-protection.component.html',
  styleUrl: './imprint-and-data-protection.component.scss'
})
export class ImprintAndDataProtectionComponent {
  constructor(private router: Router) {}


  back(){
    this.router.navigate(['']);
  }


}
