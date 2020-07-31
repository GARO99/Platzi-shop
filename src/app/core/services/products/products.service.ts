import { Injectable } from '@angular/core';
import { Product } from '../../../products/interfaces/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  products: Product[] = [
    {
      id: '1',
      image: 'assets/img/camiseta.webp',
      title: 'Camiseta',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '2',
      image: 'assets/img/hoodie.png',
      title: 'Hoodie',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '3',
      image: 'assets/img/mug.webp',
      title: 'Mug',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '4',
      image: 'assets/img/pin.png',
      title: 'Pin',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '5',
      image: 'assets/img/stickers1.webp',
      title: 'Stickers',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '6',
      image: 'assets/img/stickers2.png',
      title: 'Stickers',
      price: 80000,
      description: 'bla bla bla bla bla'
    }
  ];

  constructor() { }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProduct(id: string): Product {
    return this.products.find(item => id === item.id);
  }
}
