import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _httpClient: HttpClient) {

  }
  setRegisterForm(data: object) {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
}
