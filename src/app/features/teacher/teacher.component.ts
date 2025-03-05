import {Component, OnInit} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {SearchDto} from '../../shared/models/search';
import {catchError, debounceTime, of, Subject} from 'rxjs';
import {TeacherResponse} from '../../core/models/teacher';
import {TeacherService} from '../../core/services/teacher.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-teacher',
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent implements OnInit {
  isAdmin: boolean = false;
  userGreeting: string = '';

  teachers: TeacherResponse[] = [];
  queue: Subject<SearchDto> = new Subject<SearchDto>();
  searchParam = new SearchDto();

  totalItems = 0;

  constructor(private teacherService: TeacherService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.updateTeachers();
    this.queue.pipe(debounceTime(200)).subscribe(() => this.updateTeachers());

    // const role = this.authService.getRole();
    const role = null;
    this.userGreeting = role ? `Hello ${role}` : 'Hello User';
  }

  updateTeachers() {
    if (this.searchParam.search === null) {
      this.searchParam.search = '';
    }

    this.teacherService.getAll(this.searchParam)
      .pipe(
        catchError((error) => {
          console.log('Error occurred while retrieving teachers:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.teachers = response.teachers;
          this.totalItems = response.totalAmount;
        }
      });
  }

  applyFilter() {
    this.searchParam.currentPage = 1;
    this.queue.next(this.searchParam);
  }
}
