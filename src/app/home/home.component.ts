import { Component } from '@angular/core';

// Services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  username = '';
  roleName = '';
  roleDescription = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the logged in user from the auth service
    let user = this.authService.getLoggedInUser();

    this.username = user.username;
    this.roleName = user.role.name;
    this.roleDescription = user.role.description;
  }

  logout(): void {
    this.authService.logout();
  }
}
