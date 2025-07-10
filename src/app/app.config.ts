import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"mix-klima","appId":"1:157804550593:web:3c619d9eeb050caeebb740","storageBucket":"mix-klima.firebasestorage.app","apiKey":"AIzaSyBMk9vXhpBDIQCF0i8kAUd-0Ye8zj6mOlE","authDomain":"mix-klima.firebaseapp.com","messagingSenderId":"157804550593","measurementId":"G-FVSP3Y2ZMB"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideAnimationsAsync()]
};
