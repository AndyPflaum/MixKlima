import { Component, OnInit, SecurityContext } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AllOrdersComponent } from '../all-orders/all-orders.component';
import { Observable } from 'rxjs';
import { CustomerDate } from '../../model/customerData.class';
import { FirebaseService } from '../firebase.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [  AllOrdersComponent,HeaderComponent,RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  auftraege$!: Observable<(CustomerDate & { id: string })[]>;

  constructor(private firebase: FirebaseService) { }


  ngOnInit(): void {
    // this.auftraege$ = this.firebase.getAllAufträge(); // ⬅️ Das MUSS hier stehen
  }

}
