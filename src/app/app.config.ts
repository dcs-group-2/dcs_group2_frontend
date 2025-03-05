import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http'; // Import provideHttpClient

import { routes } from './app.routes';
import {roleInterceptor} from './core/interceptors/role.interceptor';
import { ErrorHandlerService } from './core/services/error.service';
import { AppInsightsMonitoringService } from './core/services/logging.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([roleInterceptor])),
    AppInsightsMonitoringService,
     { provide: ErrorHandler, useClass: ErrorHandlerService },
  ]
};
