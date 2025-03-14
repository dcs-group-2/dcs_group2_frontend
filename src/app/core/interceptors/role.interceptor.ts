import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';
import { from, Observable, switchMap, catchError, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';

export const roleInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const msalService = inject(MsalService);
  const activeAccount = msalService.instance.getActiveAccount();

  if (!activeAccount) {
    console.warn('No active account found');
    return next(req);
  }

  const tokenRequest = {
    scopes: environment.apiScopes,
    account: activeAccount
  };

  return from(msalService.acquireTokenSilent(tokenRequest)).pipe(
    switchMap((authResult: AuthenticationResult) => {

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authResult.accessToken}`,
        },
      });

      return next(clonedRequest);
    }),
    catchError((error) => {
      console.error('Token acquisition failed:', error);

      if (error instanceof InteractionRequiredAuthError) {
        console.log('Interaction required. Acquiring token via redirect...');
        msalService.acquireTokenRedirect(tokenRequest);
        // Important: Return the original request without the token.
        return next(req);
      }


      return throwError(() => error);
    })
  );
};
