import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedOrderComponent } from './selected-order/selected-order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth/auth.guard';
import { ImprintAndDataProtectionComponent } from './imprint-and-data-protection/imprint-and-data-protection.component';

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
            canActivate: [authGuard], // 👈 Schutz aktivieren

        children: [
            { path: '', component: SelectedOrderComponent },
            { path: 'auftrag/:id', component: SelectedOrderComponent }
        ]
    },
    {
        path: 'Datenschutz / Impressum',
        component: ImprintAndDataProtectionComponent
    },
];


