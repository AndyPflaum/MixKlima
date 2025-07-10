import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedOrderComponent } from './selected-order/selected-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: AllOrdersComponent }, // Start
            { path: 'auftrag/:id', component: SelectedOrderComponent }
        ]
    }
];

