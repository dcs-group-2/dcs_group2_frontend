import { Routes } from '@angular/router';
import {TeacherComponent} from './features/teacher/teacher.component';
import {AdminGuard} from './core/guards/admin.guard';
import {AdminComponent} from './features/admin/admin/admin.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'home', component: TeacherComponent},
];
