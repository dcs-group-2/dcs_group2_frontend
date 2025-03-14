import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FeedService} from '../../../../core/services/feed.service';
import {of, switchMap, tap} from 'rxjs';
import {FormsModule} from '@angular/forms';

interface StudentSubmission {
  id: number;
  studentName: string;
  studentSubmitted: boolean;
  teacherSubmitted: boolean;
  isPresent: boolean;
  isAbsent: boolean;
}

interface Student {
  studentId: number;
  studentName: string;
  studentSubmission: { attendance: string };
  teacherSubmission: { attendance: string };
}

@Component({
  selector: 'app-feed-detail',
  imports: [NgForOf,
    NgIf, FormsModule],
  templateUrl: './feed-detail.component.html',
  styleUrl: './feed-detail.component.scss'
})
export class FeedDetailComponent implements OnInit {

  courseId: string = "";
  sessionId: string = "";
  attendanceData: StudentSubmission[] = [];

  constructor(private route: ActivatedRoute, private feedService: FeedService,) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.sessionId = this.route.snapshot.paramMap.get('sessionId') || '';

    this.attendanceData.forEach(student => {
      if (student.teacherSubmitted) {
        student.isPresent = true;
      }
    });

    this.loadStudentData();
  }

  loadStudentData(): void {
    this.feedService.getAttendance(this.courseId, this.sessionId).subscribe({
      next: (response) => {
        this.attendanceData = response.register.map((student: Student) => ({
          id: student.studentId,
          studentName: student.studentName,
          studentSubmitted: student.studentSubmission.attendance === "Present",
          teacherSubmitted: student.teacherSubmission.attendance === "Present",
          isPresent: student.teacherSubmission.attendance === "Present",
          isAbsent: student.teacherSubmission.attendance === "Absent"
        }));
      },
      error: (error) => {
        console.error('Error fetching attendance:', error);
      }
    });
  }

  sendAttendance() {
    const presentStudents = this.attendanceData
      .filter(student => student.isPresent)
      .map(student => ({
        userId: student.id.toString(),
        kind: "present"
      }));

    const absentStudents = this.attendanceData
      .filter(student => !student.isPresent)
      .map(student => ({
        userId: student.id.toString(),
        kind: "absent"
      }));

    let firstRequest$ = absentStudents.length
      ? this.feedService.submitAttendanceAsTeacher(this.courseId, this.sessionId, absentStudents)
      : of(null); // If no absent students, skip the first request

    firstRequest$.pipe(
      switchMap(() => this.feedService.submitAttendanceAsTeacher(this.courseId, this.sessionId, presentStudents)),
      tap({
        next: (response) => {
          this.attendanceData = this.attendanceData.map(student => {
            const matchedStudent = response.register.find((entry: Student) => entry.studentId === student.id);
            return matchedStudent
              ? {
              ...student,
              studentSubmitted: matchedStudent.studentSubmission.attendance === "Present",
              teacherSubmitted: matchedStudent.teacherSubmission.attendance === "Present",
              isPresent: matchedStudent.teacherSubmission.attendance === "Present",
              isAbsent: matchedStudent.teacherSubmission.attendance === "Absent"
              }
              : student;
          });

        },
        error: (error) => {
          console.error('Error updating attendance:', error);
        }
      })
    ).subscribe();
  }



}
