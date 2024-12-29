// src/app/services/firebase.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.app = initializeApp(environment.firebaseConfig);
      this.auth = getAuth(this.app);

      onAuthStateChanged(this.auth, (user) => {
        this.userSubject.next(user);
      });
    }
  }

  // Login with Google
  loginWithGoogle(): Promise<void> {
    if (!this.auth) return Promise.reject('Firebase Auth not initialized');
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(() => {});
  }

  // Login with Email and Password
  login(email: string, password: string): Promise<void> {
    if (!this.auth) return Promise.reject('Firebase Auth not initialized');
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {})
      .catch((error: Error) => {
        // Define error type
        console.error('Email/Password Login Error:', error);
        throw error;
      });
  }

  // Logout
  logout(): Promise<void> {
    if (!this.auth) return Promise.reject('Firebase Auth not initialized');
    return signOut(this.auth);
  }

  // Additional authentication methods can be added here
}
