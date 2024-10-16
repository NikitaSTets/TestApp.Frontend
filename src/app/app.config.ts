import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideStore({ userState: userReducer }),
    provideEffects([UserEffects]),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
