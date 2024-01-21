import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideAnimations(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ 
      "projectId": "simple-crm-a64db", 
      "appId": "1:1023059225434:web:c8bc67e78dd9f340b7e163", 
      "storageBucket": "simple-crm-a64db.appspot.com", 
      "apiKey": "AIzaSyCl195lEazMNR_cpIwSg-rtUmanIOcTrTs", 
      "authDomain": "simple-crm-a64db.firebaseapp.com", 
      "messagingSenderId": "1023059225434" }))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
