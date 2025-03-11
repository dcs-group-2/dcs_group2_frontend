import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../services/auth.service';

export const maslGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
