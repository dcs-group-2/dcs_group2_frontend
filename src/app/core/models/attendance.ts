export interface StudentSubmission {
  id: string;
  studentName: string;
  studentSubmitted: boolean;
  teacherSubmitted: boolean;
  isPresent: boolean;
  isAbsent: boolean;
}

export interface Student {
  studentId: string;
  studentName: string;
  studentSubmission: { attendance: string };
  teacherSubmission: { attendance: string };
}
