import { Injectable } from '@angular/core';
import { signUp, signIn, signOut } from 'aws-amplify/auth';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private toastService: ToastService) { }

  async signIn(email: string, password: string) {
    try {
      await signOut();

      const { isSignedIn } = await signIn({
        username: email,
        password: password
      });

      if (!isSignedIn) {
        this.toastService.showAlertToast('The user has not confirmed the email, contact the administrator.');
        return;
      }

      this.toastService.showSuccessToast('The user signed in successfully.');
    } catch (error: unknown) {
      if (error instanceof Error) this.toastService.showErrorToast(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });

      this.toastService.showSuccessToast('To confirm the email, contact the administrator.');
    } catch (error: unknown) {
      if (error instanceof Error) this.toastService.showErrorToast(error.message);
    }
  }
}
