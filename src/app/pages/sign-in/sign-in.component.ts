import { Component } from '@angular/core';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email = '';
  password = '';
  ButtonFieldColorEnum = ButtonFieldColorEnum;

  constructor (private authService: AuthService) { }

  get isDisabledButtonField() {
    return !this.email || !this.password;
  }

  async signIn() {
    if (this.isDisabledButtonField) return;
    this.authService.signIn(this.email, this.password);
  }
}
