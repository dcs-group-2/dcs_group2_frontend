import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RoleService } from '../services/role.service';

export const roleInterceptor: HttpInterceptorFn = (req, next) => {
  const roleService = inject(RoleService);
  const role = roleService.getRole();

  // add the role as a custom header to current request
  if (role) {
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization-Role': role,
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
