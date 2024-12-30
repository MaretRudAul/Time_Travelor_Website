// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { FirebaseService } from '../services/firebase.service';
import { SecureCodeService } from '../services/token.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  secureCode: string = '';
  user$: Observable<User | null>;
  username: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private secureCodeService: SecureCodeService, // Updated service
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
  ) {
    this.user$ = this.firebaseService.user$;
  }

  ngOnInit(): void {
    // Fetch the current token via HTTP (if implementing the API)
    this.secureCodeService.getCurrentToken().subscribe({
      next: (token) => {
        if (token) {
          this.secureCode = token;
        } else {
          this.snackBar.open('No secure token available.', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        this.snackBar.open('Error fetching secure token.', 'Close', { duration: 3000 });
        console.error('Error fetching current token:', error);
      }
    });

    // Subscribe to real-time token updates via WebSocket
    this.secureCodeService.token$.subscribe({
      next: (token) => {
        if (token) {
          this.secureCode = token;
          this.snackBar.open('Secure token updated.', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error receiving token updates:', error);
      }
    });

    // Fetch username from backend
    this.authService.getUsername().subscribe({
      next: (name) => {
        this.username = name;
      },
      error: (error) => {
        console.error('Error fetching username:', error);
      }
    });
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

  /**
   * Copies the secure code to the clipboard.
   */
  copySecureCode(): void {
    if (this.secureCode) {
      navigator.clipboard
        .writeText(this.secureCode)
        .then(() => {
          this.snackBar.open('Secure code copied to clipboard!', 'Close', { duration: 3000 });
        })
        .catch((err) => {
          this.snackBar.open('Failed to copy secure code.', 'Close', { duration: 3000 });
          console.error('Failed to copy secure code:', err);
        });
    }
  }
}
