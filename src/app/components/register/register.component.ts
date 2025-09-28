import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _authService = inject(AuthService);
  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email,]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword)

  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value ? null : { mismatch: true };
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._authService.setRegisterForm(this.registerForm.value).subscribe(
        {
          next: (res) => {
            //action res message success => login
            console.log(res);
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            // err => show error html user
            this.msgError = err.error.message;
            this.isLoading = false;
          }
        });
    }
  }
}
