import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { IaddToCartResponse } from '../interfaces/iadd-to-cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: WritableSignal<number> = signal(0);

  constructor(private _httpClient: HttpClient) {
    effect(() => {
      localStorage.setItem('cartItem', this.cartNumber().toString());
    });
  }

  addProductToCart(id: string): Observable<IaddToCartResponse> {
    return this._httpClient
      .post<IaddToCartResponse>(`${environment.baseUrl}/api/v1/cart`, {
        productId: id,
      })
      .pipe(
        tap((res) => {
          this.cartNumber.set(res.numOfCartItems);
        }),
      );
  }
  updateSpecificProduct(id: string, count: number): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
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
