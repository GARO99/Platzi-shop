import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.model';
import { ProductsService } from '@core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  products: Product[];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void{
    this.fetchPorducts();
  }

  fetchPorducts(): void {
    this.productsService.getAllProducts().subscribe(r => { this.products	= r; });
  }

  outShoppingCart(product: Product): void
  {
    console.log(`Id: ${product.id}, Nombre: ${product.title}`);
  }

}
