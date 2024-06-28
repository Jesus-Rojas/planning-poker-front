import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FeatherModule.pick(getFeatherIcons(
      ['AlertTriangle', 'Check', 'X', 'Info']
    ))),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
