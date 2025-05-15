import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { NgxSpinnerModule } from "ngx-spinner";

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor])),
    importProvidersFrom(NgxSpinnerModule,BrowserAnimationsModule,SweetAlert2Module),

    
    
  ],
};
