import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';
import { RegisterFormService } from './register-form.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  myForm: FormGroup;
  isSubmitted: boolean = false;
  emailMinLength: number = 3;
  passwordMinLength: number = 8;
  usernameMinLength: number = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private registerFormService: RegisterFormService
  ) {
    this.myForm = this.fb.group(
      {
        // Existing fields
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(this.emailMinLength),
          ],
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(this.passwordMinLength)],
        ],

        // New fields
        confirmPassword: ['', [Validators.required]],

        username: [
          '',
          [Validators.required, Validators.minLength(this.usernameMinLength)],
        ],
      },
      {
        validator: this.confirmFieldsValidator(
          'password',
          'confirmPassword',
          'passwordMismatch'
        ),
      }
    );
  }

  // Custom validator function
  confirmFieldsValidator(
    field: string,
    confirmField: string,
    errorKey: string
  ) {
    return (group: FormGroup) => {
      const mainField = group.controls[field];
      const confirmFieldControl = group.controls[confirmField];

      if (mainField.value !== confirmFieldControl.value) {
        confirmFieldControl.setErrors({ [errorKey]: true });
      } else {
        confirmFieldControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    this.registerFormService.register(this.myForm.value).subscribe((result) => {
      let user = {
        uid: result.uid,
        email: result.email,
        access_token: '',
        refresh_token: '',
        username: result.username,
        role: result.role,
      };

      // Get the user from the backend
      this.registerFormService.getUserData(user.uid).subscribe((result) => {
        (user.access_token = result.stsTokenManager.accessToken),
          (user.refresh_token = result.stsTokenManager.refreshToken);
      });

      // Set the user in the auth service
      this.authService.setLoggedInUser(user);

      // Redirect to home page
      this.router.navigate(['home']);
    });
  }
}
