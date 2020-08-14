import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockComponent } from './components/stock/stock.component';


@NgModule({
  declarations: [ProductFormComponent, NavComponent, DashboardComponent, StockComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxCurrencyModule,
    SweetAlert2Module
  ],
})
export class AdminModule { }
