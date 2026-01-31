import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verifyCodeStep',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verifyCodeStep.component.html',
})
export class VerifyCodeStepComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  stepChange = output<number>();
  successMsg: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  verifyCode: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  // Getters for verifyCode
  get resetCodeControl() {
    return this.verifyCode.get('resetCode');
  }

  verifyCodeSubmit(): void {
    this.isLoading = true;
    this._authService
      .setCodeVerify(this.verifyCode.value)
      .subscribe({
        next: (res) => {
          if (res.status == 'Success') {
            this.successMsg = res.status;
            setTimeout(() => {
              this.successMsg = '';
              this.stepChange.emit(3);
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
