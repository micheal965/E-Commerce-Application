import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { take, timer } from 'rxjs';
import { Component, inject } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError: string = '';
  msgSuccess: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    this._authService.setLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        this.msgError = '';

        if (res.message == 'success') {
          localStorage.setItem('token', res.token);
          this._authService.saveUserData();

          const seconds = 2;
          timer(0, 1000)
            .pipe(take(seconds + 1))
            .subscribe((i) => {
              const remain = seconds - i;
              this.msgSuccess =
                remain > 0
                  ? `Login successful! Redirecting you to home in ${remain} seconds...`
                  : '';

              if (remain === 0) this._router.navigate(['/home']);
            });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
        this.isLoading = false;
      },
    });
  }

  clearBackendError() {
    this.msgError = '';
  }
}
