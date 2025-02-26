import { Routes } from '@angular/router';
import {TeacherComponent} from './features/teacher/teacher.component';
import {AdminGuard} from './core/guards/admin.guard';
import {AdminComponent} from './features/admin/admin.component';
import {FeedComponent} from './features/feed/feed/feed.component';

export const routes: Routes = [
  {path: '', redirectTo: 'feed', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'teacher', component: TeacherComponent, canActivate: [AdminGuard]},
  {path: 'feed', component: FeedComponent},
];
