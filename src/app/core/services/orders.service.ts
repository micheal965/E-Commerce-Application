import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {}

  checkout(id: string | null, shippingDetails: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,
      {
        shippingAddress: shippingDetails,
      },
    );
  }
  getUserOrders(): Observable<any> {
    const userId = this._authService.userId();
    return this._httpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${userId}`,
    );
  }
}
