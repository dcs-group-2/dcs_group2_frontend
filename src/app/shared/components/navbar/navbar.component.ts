import {Component, computed} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {

  username = computed(() => this.authService.username());
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
