import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../products/interfaces/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.urlAPI}products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.urlAPI}products/${id}`);
  }
}
