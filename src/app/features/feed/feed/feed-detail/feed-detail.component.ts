import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FeedService} from '../../../../core/services/feed.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-feed-detail',
  imports: [NgForOf,
    NgIf, NgClass],
  templateUrl: './feed-detail.component.html',
  styleUrl: './feed-detail.component.scss'
})
export class FeedDetailComponent implements OnInit {

  courseId: number | null = null;
  students = [
    { id: 1, firstName: 'John', lastName: 'Doe', present: false, alreadyMarked: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', present: false, alreadyMarked: false },
    { id: 3, firstName: 'Emily', lastName: 'Johnson', present: false, alreadyMarked: true },
    { id: 4, firstName: 'Michael', lastName: 'Brown', present: false, alreadyMarked: false }
  ];

  attendanceStatus = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private feedService: FeedService,) {}

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.students.forEach(student => {
      if (student.alreadyMarked) {
        student.present = true;
      }
    });
  }

  sendAttendance() {
    if (!this.courseId) return;

    const presentStudents = this.students.filter(s => s.present);

    this.feedService.submitAttendance(this.courseId, presentStudents).pipe(
      tap({
        next: () => {
          this.attendanceStatus.set('Attendance submitted successfully!');
          presentStudents.forEach(s => s.alreadyMarked = true); // Mark them as already marked
        },
        error: () => {
          this.attendanceStatus.set('Failed to submit attendance.');
        }
      })
    ).subscribe();
  }

}
