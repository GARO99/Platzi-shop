import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../products/interfaces/product.model';
import { environment } from '@environments/environment';

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

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.urlAPI}products`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${environment.urlAPI}products/${id}`, product);
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.urlAPI}products/${id}`);
  }
}
