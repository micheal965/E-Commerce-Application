import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError: string = '';
  msgSuccess: string = '';
  isLoading: boolean = false;

  loginSub!: Subscription;

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginSub = this._authService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.msgError = '';
          if (res.message == 'success') {
            let seconds: number = 2;
            this.msgSuccess = `Login successful! Redirecting you to home in ${seconds} seconds...`;
            localStorage.setItem('token', res.token);
            this._authService.saveUserData();
            const interval = setInterval(() => {
              seconds--;
              this.msgSuccess = `Login successful! Redirecting you to home in ${seconds} seconds...`;
              if (seconds === 0) {
                clearInterval(interval);
                this._router.navigate(['/home']);
              }
            }, 2000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
