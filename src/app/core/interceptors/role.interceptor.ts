import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RoleService } from '../services/role.service';

export const roleInterceptor: HttpInterceptorFn = (req, next) => {
  const roleService = inject(RoleService);
  const role = roleService.getRole();

  if (!role) {
    return next(req);
  }

  // add the role as a custom header to current request
  const modifiedReq = req.clone({
    setHeaders: {
      'Authorization-Role': role,
    },
  });

  return next(modifiedReq);
};
