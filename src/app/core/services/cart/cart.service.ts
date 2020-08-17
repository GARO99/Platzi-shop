import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../../../products/interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product): void {
    if (this.products.length > 0){
      if (!this.products.some(({id}) => id === product.id)) {
        this.products = [...this.products, product];
      }
    }else {
      this.products = [...this.products, product];
    }

    this.cart.next(this.products);
  }
}
