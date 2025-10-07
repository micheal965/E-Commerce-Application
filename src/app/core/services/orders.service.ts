import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  headers: any = { token: localStorage.getItem('token') };
  constructor(private _httpClient: HttpClient) { }

  checkout(id: string | null, shippingDetails: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`, {
      "shippingAddress": shippingDetails
    }, {
      headers: this.headers
    })
  }
  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }
}
