import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service'; // Added FirebaseService import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService, // Injected FirebaseService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const { username, password } = this.signupForm.value;
      this.authService.signup(username, password).subscribe({
        next: (response) => {
          // Automatically log in the user after successful signup
          this.authService.login(username, password).subscribe({
            next: (loginResponse) => {
              localStorage.setItem('token', loginResponse.token);
              this.isSubmitting = false;
              this.router.navigate(['/']);
            },
            error: (loginError) => {
              this.errorMessage =
                loginError.error.detail || 'Login failed after signup.';
              this.isSubmitting = false;
              console.error('Login error after signup:', loginError);
            },
          });
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = error.error.username
              ? error.error.username[0]
              : error.error.detail || 'Signup failed. Please try again.';
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }
          this.isSubmitting = false;
          console.error('Signup error:', error);
        },
      });
    }
  }

  loginWithGoogle(): void {
    this.firebaseService
      .loginWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error: Error) => {
        this.errorMessage = error.message;
        console.error('Google login error:', error);
      });
  }
}
