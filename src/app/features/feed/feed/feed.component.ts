import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {Roles} from '../../../core/models/roles-enum';
import {FeedService} from '../../../core/services/feed.service';
import {Router} from '@angular/router';


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
  upcomingCourses: DisplayCourse[] = [];

  constructor(private authService: AuthService, private feedService: FeedService, private router: Router) {
    this.role = Roles.Teacher;
  }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/users']);
    }

    this.fetchCourses();
  }

  fetchCourses(): void {
    this.feedService.getAll().subscribe({
      next: (response: any[]) => {
        console.log(response);
        this.upcomingCourses = response.map(course => ({
          id: course.id,
          name: course.courseName, // Updated field name
          start: this.formatTime(course.startDate), // Updated field name
          end: this.formatTime(course.endDate), // Updated field name
          courseId: course.courseId,
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

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  onViewDetails(event: Event, course: DisplayCourse): void {
    event.stopPropagation(); // Prevents card click
    this.goToCourseDetails(course);
  }

  markPresAsStudent(course: DisplayCourse): void {
    const attendancePayload = [ { kind: 'present' } ];
    this.feedService.submitAttendanceAsStudent(course.courseId, course.id, attendancePayload).subscribe({
      next: (response) => {
        console.log('Attendance submitted successfully:', response);
      },
      error: (error) => {
        console.error('Error submitting attendance:', error);
      }
    });
  }

  goToCourseDetails(course: any) {
    this.router.navigate(['/feed', course.courseId, course.id]);
  }
}
