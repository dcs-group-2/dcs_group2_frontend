import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }

  /*
  firstName: unknown = '';
  lastName: unknown = '';
  appRoles: string[] = [];

  constructor(private msalService: MsalService) {
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  getUserDetails(): void {
    const account: AccountInfo | null = this.msalService.instance.getActiveAccount();
    if (account && account.idTokenClaims) {
      console.log(account);
      this.firstName = account.name;
      this.appRoles = account.idTokenClaims['roles'] || [];
    }

    const request = {
      account: account,
    };


  }

  login() {
    this.msalService.loginPopup().subscribe({
      next: (response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        console.log("Login successful!", response);

        this.getUserDetails(); // Retrieve user details after successful login

      },
      error: (error) => console.error("Login error:", error)
    });

    // this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutPopup().subscribe({
      next: () => {
        console.log("Logout successful!");
      },
      error: (error) => console.error("Logout error:", error)
    });
  }
   */


}
