import { Component, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart/cart.service';
import { Product } from '../../../products/interfaces/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products$ = this.cartService.cart$;
  }

}
