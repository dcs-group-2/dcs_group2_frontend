import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {Roles} from '../../../core/models/roles-enum';
import {FeedService} from '../../../core/services/feed.service';
import {Router} from '@angular/router';

interface CourseData {
  id: string;
  course: {
    id: string;
    name: string;
    department: string;
    teachers: string[];
    students: string[];
    sessions: any[];
  };
  startTime: string;
  endTime: string;
}

interface DisplayCourse {
  id: string;
  name: string;
  start: string;
  end: string;
  courseId: string;
}

@Component({
  selector: 'app-feed',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  role: string | null;
  /*
  upcomingCourses = [
    { id: 10, name: 'Mathematics 101', start: '10:00 AM', end: '11:30 AM' },
    { id: 11, name: 'Physics 202', start: '12:00 PM', end: '1:30 PM' },
    { id: 12, name: 'Chemistry 303', start: '2:00 PM', end: '3:30 PM' },
    { id: 13, name: 'History 404', start: '4:00 PM', end: '5:30 PM' }
  ];*/

  upcomingCourses: DisplayCourse[] = [];

  constructor(private authService: AuthService, private feedService: FeedService, private router: Router) {
    this.role = Roles.Teacher;
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.feedService.getAll().subscribe({
      next: (response: CourseData[]) => {
        console.log(response);
        this.upcomingCourses = response.map(course => ({
          id: course.id,
          name: course.course.name,
          start: this.formatTime(course.startTime),
          end: this.formatTime(course.endTime),
          courseId: course.course.id
        }));
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  isStudent(): boolean {
    return this.authService.isStudent();
  }

  markPresAsStudent(course: DisplayCourse): void {
    this.feedService.submitAttendanceAsStudent(course.courseId, course.id).subscribe({
      next: (response) => {
        console.log('Attendance submitted successfully:', response);
        // Optionally, update the UI to reflect the attendance status
      },
      error: (error) => {
        console.error('Error submitting attendance:', error);
        // Optionally, display an error message to the user
      }
    });
  }

  logg() {
    this.feedService.getAll().subscribe({
      next: (response) => console.log('Response:', response),
    });

    console.log(this.authService.appRoles());
    console.log(this.authService.isAuthenticated());
    console.log(this.authService.username());
  }

  goToCourseDetails(course: any) {
    this.router.navigate(['/feed', course.id]);
  }
}
