import { Injectable } from '@angular/core';
import { signUp } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login() {
    console.log('Login');
  }

  async signup(email: string, password: string) {
    console.log('Signup');
    try {
      const { nextStep, isSignUpComplete, userId } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      console.log({ nextStep, isSignUpComplete, userId });
    } catch (error) {
      console.log(error);
    }
  }
}
