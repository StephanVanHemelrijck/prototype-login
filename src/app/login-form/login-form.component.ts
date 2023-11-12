import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  myForm: FormGroup;
  isSubmitted: boolean = false;
  usernameMinLength: number = 3;
  passwordMinLength: number = 8;

  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormService
  ) {
    this.myForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(this.usernameMinLength)],
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
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
