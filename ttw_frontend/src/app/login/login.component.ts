import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Replace with actual login logic (API call)
    console.log('Login with:', this.username, this.password);
    // Navigate to homepage after login
    this.router.navigate(['/']);
  }

  loginWithGoogle(): void {
    // Replace with Google login logic
    console.log('Login with Google');
  }
}
