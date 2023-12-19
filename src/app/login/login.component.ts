import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isRegistering: boolean = false;

  constructor() {}

  changeMode() {
    this.isRegistering = !this.isRegistering;
  }
}
