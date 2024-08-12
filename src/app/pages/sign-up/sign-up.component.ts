import { Component } from '@angular/core';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email = '';
  password = '';
  ButtonFieldColorEnum = ButtonFieldColorEnum;

  constructor (
    private authService: AuthService
  ) { }

  get isDisabledButtonField() {
    return !this.email || !this.password;
  }

  async signUp() {
    if (this.isDisabledButtonField) return;
  }
}
