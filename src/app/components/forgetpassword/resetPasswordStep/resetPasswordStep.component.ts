import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-resetPasswordStep',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetPasswordStep.component.html',
})
export class ResetPasswordStepComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  emailInput = input.required<string>();
  stepChange = output<number>();
  successMsg: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;
  resetPassword: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPassword = this.fb.group({
      email: [{ value: '' }, [Validators.required, Validators.email]], // read-only
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    });
  }

  ngOnChanges() {
    if (this.emailInput) {
      this.resetPasswordEmail?.patchValue(this.emailInput());
    }
  }
  // Getters for resetPassword
  get resetPasswordEmail() {
    return this.resetPassword.get('email');
  }

  get newPasswordControl() {
    return this.resetPassword.get('newPassword');
  }

  resetPasswordSubmit(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this._authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token != null) {
          this.successMsg =
            'Password reset successful! Redirecting to the home page...';
          localStorage.setItem('token', res.token);

          setTimeout(() => {
            this.successMsg = '';
            this._router.navigate(['/home']);
            this.isLoading = false;
            this.stepChange.emit(1);
          }, 2000);
        } else {
          this.errorMsg = 'There is an error while resetting password';
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.errorMsg = '';
          this.isLoading = false;
        }, 3000);
      },
    });
  }
}
