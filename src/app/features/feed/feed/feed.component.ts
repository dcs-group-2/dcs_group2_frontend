import { Component } from '@angular/core';
import {RoleService} from '../../../core/services/role.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  role: string | null;
  upcomingCourses = [
    { name: 'Mathematics 101', start: '10:00 AM', end: '11:30 AM' },
    { name: 'Physics 202', start: '12:00 PM', end: '1:30 PM' },
    { name: 'Chemistry 303', start: '2:00 PM', end: '3:30 PM' },
    { name: 'History 404', start: '4:00 PM', end: '5:30 PM' }
  ];

  constructor(private roleService: RoleService) {
    this.role = this.roleService.getRole();
  }

  isStudent(): boolean {
    return this.roleService.isStudent();
  }

  isAdminOrTeacher(): boolean {
    return this.roleService.isAdmin() || this.roleService.isTeacher();
  }
}
