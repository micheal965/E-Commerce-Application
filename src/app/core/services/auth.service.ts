import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  userData: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    let token: string = localStorage.getItem('token')!;
    if (token !== null)
      this.userData = jwtDecode(token);
  }

  Logout(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this._router.navigate(['/login']);
  }
}
