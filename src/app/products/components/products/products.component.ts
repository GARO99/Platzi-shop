import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  products: Product[];

  constructor(
    private prodductService: ProductsService
  ) {}

  ngOnInit(): void{
    this.products	= this.prodductService.getAllProducts();
  }

  outShoppingCart(product: Product): void
  {
    console.log(`Id: ${product.id}, Nombre: ${product.title}`);
  }

}
