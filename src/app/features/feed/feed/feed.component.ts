import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {Roles} from '../../../core/models/roles-enum';
import {FeedService} from '../../../core/services/feed.service';
import {Router} from '@angular/router';
import {Student, StudentSubmission} from '../../../core/models/attendance';


interface DisplayCourse {
  id: string;
  name: string;
  start: string;
  end: string;
  courseId: string;
  studentSubmitted: boolean;
  teacherSubmitted: boolean;
  isAbsent: boolean;
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
        this.upcomingCourses = response.map(course => ({
          id: course.id,
          name: course.courseName,
          start: this.formatTime(course.startDate),
          end: this.formatTime(course.endDate),
          courseId: course.courseId,
          studentSubmitted: course.attendance?.status.attendance === "Present",
          teacherSubmitted: course.attendance?.teacherStatus.attendance === "Present",
          isAbsent: course.attendance?.teacherStatus.attendance === "Absent"
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
    const attendancePayload = [{ kind: 'present' }];

    this.feedService.submitAttendanceAsStudent(course.courseId, course.id, attendancePayload).subscribe({
      next: (response) => {
        const studentId = this.authService.getAccountId();
        const currentStudent = response.register.find((entry: Student) => entry.studentId === studentId);

        if (currentStudent) {
          this.upcomingCourses = this.upcomingCourses.map(existingCourse => {
            if (existingCourse.id === response.id) {
              return {
                ...existingCourse,
                studentSubmitted: currentStudent.studentSubmission.attendance === "Present",
                teacherSubmitted: currentStudent.teacherSubmission.attendance === "Present",
                isAbsent: currentStudent.teacherSubmission.attendance === "Absent"
              };
            }
            return existingCourse;
          });
        }
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
