import {Injectable} from '@angular/core';
import {Roles} from '../models/roles-enum';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleKey = 'userRole';

  constructor() { }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey)
  }

  setRole(role: Roles): void {
    localStorage.setItem(this.roleKey, role);
  }

  isAdmin(): boolean {
    return this.getRole() === Roles.Admin;
  }

  isStudent(): boolean {
    return this.getRole() === Roles.Student;
  }

  isTeacher(): boolean {
    return this.getRole() === Roles.Teacher;
  }
}
