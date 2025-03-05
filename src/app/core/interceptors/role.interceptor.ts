import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';
import { from, Observable, switchMap, catchError, throwError } from 'rxjs';

export const roleInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const msalService = inject(MsalService);
  const activeAccount = msalService.instance.getActiveAccount();

  if (!activeAccount) {
    console.warn('No active account found');
    return next(req);
  }

  const tokenRequest = {
    scopes: ['api://uva-devops-attendance-app/application.fullaccess'],
    account: activeAccount
  };

  return from(msalService.acquireTokenSilent(tokenRequest)).pipe(
    switchMap((authResult: AuthenticationResult) => {
      console.log('Token acquired successfully:', authResult);

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authResult.accessToken}`,
        },
      });

      console.log("TOKEEEEEN ", authResult.accessToken);
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

      /*
      if (error instanceof InteractionRequiredAuthError) {
        console.log('Interaction required. Acquiring token interactively...');
        return from(msalService.acquireTokenPopup(tokenRequest)).pipe(
          switchMap((authResult: AuthenticationResult) => {
            console.log('Interactive token acquired successfully:', authResult);

            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authResult.accessToken}`,
              },
            });

            console.log('Sending request with token...');
            return next(clonedRequest);
          }),
          catchError((interactiveError) => {
            console.error('Interactive token acquisition failed:', interactiveError);
            return throwError(() => interactiveError);
          })
        );
      }
      */

      return throwError(() => error);
    })
  );
};
