import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../../core/services/role.service';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {
  username: string = '';

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    const role = this.roleService.getRole();
    this.username = role || 'Unknown';
  }

  isAdmin(): boolean {
    return this.roleService.isAdmin();
  }

}
