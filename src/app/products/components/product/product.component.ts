import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.model';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  @Output() clickAddShoppingCart: EventEmitter<Product> = new EventEmitter();

  constructor(
    private cartService: CartService
  ) {}

  addShoppingCart(): void {
    this.cartService.addCart(this.product);
    // this.clickAddShoppingCart.emit(this.product);
  }
}
