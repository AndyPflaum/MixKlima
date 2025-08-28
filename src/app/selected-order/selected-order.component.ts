import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-order.component.html',
  styleUrls: ['./selected-order.component.scss'],
})
export class SelectedOrderComponent implements OnInit {
  selectedOrder: any = null;
  route = inject(ActivatedRoute);
  firebase = inject(FirebaseService);

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id) {
      this.firebase.getOrderById(id).then(order => {
        this.selectedOrder = order;
      }).catch(() => {
        this.selectedOrder = null;
      });
    } else {
      this.selectedOrder = null;
    }
  });
}

  mobieleViewChange(){
    if (window.innerWidth < 620){
    this.firebase.mobileMainView = false;

    }
  }
}
