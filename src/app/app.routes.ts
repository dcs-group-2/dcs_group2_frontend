import { Routes } from '@angular/router';
import {TeacherComponent} from './features/teacher/teacher.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: TeacherComponent},
];
