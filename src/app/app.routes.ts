import { Routes } from '@angular/router';
import {TeacherComponent} from './features/teacher/teacher.component';
import {AdminComponent} from './features/admin/admin.component';
import {FeedComponent} from './features/feed/feed/feed.component';
import {LoginComponent} from './features/login/login.component';
import {maslGuard} from './core/guards/masl.guard';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {AdminGuard} from './core/guards/admin.guard';
import {FeedDetailComponent} from './features/feed/feed/feed-detail/feed-detail.component';
import {AdminTeacherGuard} from './core/guards/adminteacher.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [maslGuard], // Apply the guard here
    children: [
      { path: '', component: FeedComponent },
      { path: 'feed/:id', component: FeedDetailComponent, canActivate: [AdminTeacherGuard] },
      { path: 'teacher', component: TeacherComponent, canActivate: [AdminGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];

