import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { VerifyEmailStepComponent } from './verifyEmailStep/verifyEmailStep.component';
import { VerifyCodeStepComponent } from './verifyCodeStep/verifyCodeStep.component';
import { ResetPasswordStepComponent } from './resetPasswordStep/resetPasswordStep.component';

@Component({
  selector: 'app-forgetPassword',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    VerifyEmailStepComponent,
    VerifyCodeStepComponent,
    ResetPasswordStepComponent,
  ],
  templateUrl: './forgetPassword.component.html',
})
export class ForgetpasswordComponent {
  step: number = 1;
  email: string = '';
}
