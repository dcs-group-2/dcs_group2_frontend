import {Injectable, signal} from '@angular/core';
import {AccountInfo, AuthenticationResult} from '@azure/msal-browser';
import {Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);
  username = signal<string | null>(null);
  appRoles = signal<string[]>([]);

  constructor(private msalService: MsalService, private router: Router) {
    this.loadUser();
  }

  private loadUser(): void {
    const account: AccountInfo | null = this.msalService.instance.getActiveAccount();
    if (account && account.idTokenClaims) {
      this.isAuthenticated.set(true);
      this.username.set(account.name || null);
      this.appRoles.set(account.idTokenClaims['roles'] || []);
    } else {
      this.isAuthenticated.set(false);
      this.username.set(null);
      this.appRoles.set([]);
    }
  }

  login(): void {
    this.msalService.loginPopup().subscribe({
      next: (response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        this.loadUser();
        this.router.navigate(['/']);
      },
      error: (error) => console.error('Login error:', error),
    });
  }

  logout(): void {
    this.msalService.logoutPopup();
    this.username.set(null);
    this.isAuthenticated.set(false);
    this.appRoles.set([]);
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.appRoles().includes('role.admin');
  }

  isStudent(): boolean {
    return this.appRoles().includes('role.student');
  }

  isTeacher(): boolean {
    return this.appRoles().includes('role.teacher');
  }
}
