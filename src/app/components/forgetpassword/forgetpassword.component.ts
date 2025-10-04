import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnDestroy {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  private Subscriptions = new Subscription();

  isLoading: boolean = false;
  step: number = 1;
  successMsg: string = '';
  errorMsg: string = '';

  verifyEmail: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });

  verifyCode: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  });

  resetPassword: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  verifyEmailSubmit(): void {
    this.isLoading = true;
    const sub = this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.successMsg = res.message;
          setTimeout(() => {
            this.successMsg = '';
            this.step = 2;
            this.isLoading = false;
          }, 2000);
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
        this.isLoading = false;
      }
    });
    this.Subscriptions.add(sub);
  }

  verifyCodeSubmit(): void {
    this.isLoading = true;
    const sub = this._authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.successMsg = res.status;
          this.resetPassword.get('email')?.patchValue(this.verifyEmail.get('email')?.value);
          setTimeout(() => {
            this.successMsg = '';
            this.step = 3;
            this.isLoading = false;
          }, 2000);
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
        this.isLoading = false;
      }
    });
    this.Subscriptions.add(sub);
  }

  resetPasswordSubmit(): void {
    this.isLoading = true;
    this.errorMsg = '';
    const sub = this._authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token != null) {
          this.successMsg = 'Password reset successful! Redirecting to the home page...';
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this._router.navigate(['/home']);
            this.step = 1;
            this.isLoading = false;
          }, 2000);
        } else {
          this.errorMsg = 'There is an error while resetting password';
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
        this.isLoading = false;
      }
    });
    this.Subscriptions.add(sub);
  }
  ngOnDestroy(): void {
    this.Subscriptions.unsubscribe();
  }
}