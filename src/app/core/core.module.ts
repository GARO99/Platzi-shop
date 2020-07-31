import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService } from './services/products/products.service';

@NgModule({
  declarations: [],
  providers: [ProductsService],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
