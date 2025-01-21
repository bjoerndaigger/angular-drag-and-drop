import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"angular-drag-and-drop-747f8","appId":"1:860166634312:web:66712c33d27ef9fab4917d","storageBucket":"angular-drag-and-drop-747f8.firebasestorage.app","apiKey":"AIzaSyAIeHQpFvOqnqprosaRXLPmcbQLizifDIM","authDomain":"angular-drag-and-drop-747f8.firebaseapp.com","messagingSenderId":"860166634312"})), provideFirestore(() => getFirestore())]
};
