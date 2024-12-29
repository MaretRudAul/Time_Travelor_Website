// src/app/home/home.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { isPlatformBrowser } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { SecureCodeService } from '../services/token.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule], // Add RouterModule here
})
export class HomeComponent implements OnInit {
  secureCode: string = '';
  user$: Observable<User | null>;
  username: string = ''; // Add username property

  constructor(
    private firebaseService: FirebaseService,
    private secureCodeService: SecureCodeService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private authService: AuthService, // Inject AuthService
  ) {
    this.user$ = this.firebaseService.user$;
  }

  ngOnInit(): void {
    this.muteVideo();

    this.secureCodeService.listenForUpdates((token: string) => {
      this.secureCode = token; // Update secure code whenever a new one is received
    });

    // Fetch username from backend
    this.authService.getUsername().subscribe((name) => {
      this.username = name;
    });
  }

  /**
   * Mutes the video element on the page.
   */
  private muteVideo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.muted = true; // Ensure the video is muted
      }
    }
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this.firebaseService
      .logout()
      .then(() => {
        // Navigate to the login page after successful logout
        this.router.navigate(['/']);
      })
      .catch((error: Error) => {
        console.error('Logout error:', error);
      });
  }

  copySecureCode(): void {
    if (this.secureCode) {
      navigator.clipboard
        .writeText(this.secureCode)
        .then(() => {
          console.log('Secure code copied to clipboard!');
          // change to be notification style, rather than alert.
          // alert('Secure code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy secure code:', err);
          // alert('Failed to copy secure code.');
        });
    }
  }
}
