import {Component, OnInit} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {catchError, of} from 'rxjs';
import {UserResponse} from '../../core/models/teacher';
import {UserService} from '../../core/services/user.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-user',
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  isAdmin: boolean = false;
  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  searchParam: string = '';

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.updateUsers();
  }

  updateUsers() {
    this.userService.getAll()
      .pipe(
        catchError((error) => {
          console.log('Error occurred while retrieving users:', error);
          return of([]); // Return empty array to prevent errors
        })
      )
      .subscribe((response) => {
        if (response) {
          this.users = response;
          this.filteredUsers = response;
        }
      });
  }

  applyFilter() {
    const search = this.searchParam.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  }
}
