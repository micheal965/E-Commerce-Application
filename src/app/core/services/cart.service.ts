import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: WritableSignal<number> = signal(0);

  constructor(private _httpClient: HttpClient) {
    effect(() => {
      localStorage.setItem('cartItem', this.cartNumber().toString());
    })
  }

  addProductToCart(id: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`, { "productId": id })
  }
  updateSpecificProduct(id: string, count: number): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, { "count": count });
  }
  getProductsCart(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }
  deleteSpecificCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }
  clearCart(): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }

}
