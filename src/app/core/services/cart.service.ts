import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);
  headers: any = {
    token: localStorage.getItem('token')
  }

  addProductToCart(id: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      "productId": id
    }, {
      headers: this.headers
    })
  }
  updateSpecificProduct(id: string, count: number): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      "count": count
    },
      {
        headers: this.headers
      });
  }
  getProductsCart(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.headers
    });
  }
  deleteSpecificCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: this.headers
    });
  }
  clearCart(): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.headers
    });
  }

}
