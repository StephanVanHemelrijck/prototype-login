import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormService } from './login-form.service';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  myForm: FormGroup;
  isSubmitted: boolean = false;
  emailMinLength: number = 3;
  passwordMinLength: number = 8;

  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormService,
    private router: Router,
    private authService: AuthService
  ) {
    this.myForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(this.emailMinLength)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(this.passwordMinLength)],
      ],
    });
  }

  onSubmit(): void {
    console.log('Form submitted!');
    console.log(this.myForm.value);

    this.isSubmitted = true;

    this.loginFormService.login(this.myForm.value).subscribe(
      (result) => {
        let user = {
          uid: result.uid,
          email: result.email,
          access_token: result.stsTokenManager.accessToken,
          refresh_token: result.stsTokenManager.refreshToken,
          username: '',
          role: {},
        };

        // Get the user from the backend
        this.loginFormService.getUserData(user.uid).subscribe((result) => {
          user.username = result.username;
          user.role = result.role;

          // Set the user in the auth service
          this.authService.setLoggedInUser(user);

          // Rediret to home page
          this.router.navigate(['home']);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
