import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http'; // Import provideHttpClient
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import {roleInterceptor} from './core/interceptors/role.interceptor';
import {MsalBroadcastService, MsalGuard, MsalService} from '@azure/msal-angular';
import { ErrorHandlerService } from './core/services/error.service';
import { AppInsightsMonitoringService } from './core/services/logging.service';

import { MSAL_INSTANCE, MsalInterceptor } from '@azure/msal-angular';
import {
  PublicClientApplication
} from '@azure/msal-browser';

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUri,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([roleInterceptor])),
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    MsalService,
    MsalInterceptor,
    MsalGuard,
    MsalBroadcastService,
    AppInsightsMonitoringService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ]
};
