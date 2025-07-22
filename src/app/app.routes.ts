import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedOrderComponent } from './selected-order/selected-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: SelectedOrderComponent },
            { path: 'auftrag/:id', component: SelectedOrderComponent }
        ]
    }
];


