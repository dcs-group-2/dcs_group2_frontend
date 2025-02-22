import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {RoleService} from './core/services/role.service';
import {Roles} from './core/models/roles-enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'attendance_frontend';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    if (this.roleService.getRole() === null) {
      this.roleService.setRole(Roles.Student); // Set default role in storage
    }
  }
}
