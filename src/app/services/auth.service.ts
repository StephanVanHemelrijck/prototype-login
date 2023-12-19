import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any;

  constructor() {
    // You can initialize the user here based on saved session data or other mechanisms
    this.loggedInUser = null;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  logout(): void {
    // Implement logout logic, e.g., clear session data
    this.loggedInUser = null;
  }
}
