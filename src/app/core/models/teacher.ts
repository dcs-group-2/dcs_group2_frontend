export class Teacher {
  firstName: string = '';
  lastName: string = '';
}

export class TeacherResponse {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
}

export class TeachersPaginated {
  teachers: TeacherResponse[] = [];
  totalAmount: number = 0;
}
