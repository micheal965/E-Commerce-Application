import { Component } from '@angular/core';
import { VerifyCodeStepComponent } from './verifyCodeStep/verifyCodeStep.component';
import { VerifyEmailStepComponent } from './verifyEmailStep/verifyEmailStep.component';
import { ResetPasswordStepComponent } from './resetPasswordStep/resetPasswordStep.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    VerifyEmailStepComponent,
    VerifyCodeStepComponent,
    ResetPasswordStepComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  step: number = 1;
  email: string = '';
}
