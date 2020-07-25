import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  @Output() clickAddShoppingCart: EventEmitter<Product> = new EventEmitter();

  addShoppingCart(): void {
    this.clickAddShoppingCart.emit(this.product);
  }
}
