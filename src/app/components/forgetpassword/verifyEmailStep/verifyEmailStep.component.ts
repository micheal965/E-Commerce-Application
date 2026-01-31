import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verifyEmailStep',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verifyEmailStep.component.html',
})
export class VerifyEmailStepComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  stepChange = output<number>();
  email = output<string>();
  successMsg: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  verifyEmail: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  get verifyEmailControl() {
    return this.verifyEmail.get('email');
  }

  verifyEmailSubmit(): void {
    this.isLoading = true;
    this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.successMsg = res.message;
          setTimeout(() => {
            this.successMsg = '';
            this.stepChange.emit(2);
            this.email.emit(this.verifyEmailControl?.value);
            this.isLoading = false;
          }, 2000);
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
