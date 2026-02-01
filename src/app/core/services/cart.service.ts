import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Icart } from '../interfaces/icart';
import { IcrudCartResponse } from '../interfaces/icart-crud-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);

  private readonly _cart = signal<Icart | null>(null);
  readonly cart = this._cart.asReadonly();

  private readonly _cartNumber = signal(0);
  readonly cartNumber = this._cartNumber.asReadonly();

  getProductsCart(): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}/api/v1/cart`)
      .pipe(tap((res) => this._cart.set(res.data)));
  }
  deleteSpecificCartItem(id: string): Observable<IcrudCartResponse> {
    return this.http
      .delete<IcrudCartResponse>(`${environment.baseUrl}/api/v1/cart/${id}`)
      .pipe(
        tap((res) => {
          this._cartNumber.set(res.numOfCartItems);
          this._cart.set(res.data);
          this.toastr.success('Item removed from your cart.');
        }),
      );
  }

  addProductToCart(id: string): Observable<IcrudCartResponse> {
    return this.http
      .post<IcrudCartResponse>(`${environment.baseUrl}/api/v1/cart`, {
        productId: id,
      })
      .pipe(
        tap((res) => {
          this._cart.set(res.data);
          this._cartNumber.set(res.numOfCartItems);
          this.toastr.success('Item added to your cart.');
        }),
      );
  }

  updateSpecificProduct(
    id: string,
    count: number,
  ): Observable<IcrudCartResponse> {
    return this.http
      .put<IcrudCartResponse>(`${environment.baseUrl}/api/v1/cart/${id}`, {
        count,
      })
      .pipe(
        tap((res) => {
          this._cart.set(res.data);
          this._cartNumber.set(res.numOfCartItems);
          this.toastr.success('Your cart item count has been updated.');
        }),
      );
  }
  clearCart(): Observable<IcrudCartResponse> {
    return this.http
      .delete<IcrudCartResponse>(`${environment.baseUrl}/api/v1/cart`)
      .pipe(
        tap((res) => {
          this._cart.set(null);
          this._cartNumber.set(res.numOfCartItems ?? 0);
          this.toastr.success('Cart cleared successfully.');
        }),
      );
  }
}
