import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { Auth } from './services/auth';

function initAuth(auth: Auth) {
  return () => {
    return auth.loadUser();
  }
}


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideIcons({heroPencil, heroTrash}),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [Auth],
      multi: true           
    },
    provideHttpClient(withFetch()),
  ]
};
