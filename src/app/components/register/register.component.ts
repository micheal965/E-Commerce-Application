import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  msgError: string = '';
  msgSuccess: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = this._formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: this.confirmPassword });

  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value ? null : { mismatch: true };
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._authService.setRegisterForm(this.registerForm.value).subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            if (res.message == 'success') {
              this.msgSuccess = 'Registration completed successfully! Redirecting you to login in 2 seconds...';
              setTimeout(() => {
                this._router.navigate(['./login']);
              }, 2000);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            this.isLoading = false;
          }
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
