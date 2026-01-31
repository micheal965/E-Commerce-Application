import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError: string = '';
  msgSuccess: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = this._formBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword },
  );

  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get rePassword() {
    return this.registerForm.get('rePassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }

  registerSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    this._authService.setRegisterForm(this.registerForm.value).subscribe({
      next: (res) => {
        this.msgError = '';

        if (res.message == 'success') {
          const seconds = 2;
          timer(0, 1000)
            .pipe(take(seconds + 1))
            .subscribe((i) => {
              const remain = seconds - i;
              this.msgSuccess = `Registration completed successfully! Redirecting you to login in ${remain} seconds...`;

              if (remain === 0) this._router.navigate(['./login']);
            });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.msgError = err.error.message;
      },
    });
  }
  clearBackendMsg() {
    this.msgError = '';
  }
}
