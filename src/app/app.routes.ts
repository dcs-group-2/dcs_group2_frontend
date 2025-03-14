import { Routes } from '@angular/router';
import {UserComponent} from './features/user/user.component';
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
    canActivate: [maslGuard],
    children: [
      { path: '', component: FeedComponent },
      { path: 'feed/:courseId/:sessionId', component: FeedDetailComponent, canActivate: [AdminTeacherGuard] },
      { path: 'users', component: UserComponent, canActivate: [AdminGuard] },
    ],
  },

  { path: '**', redirectTo: '' },
];
