import { Component, OnInit } from '@angular/core';

/**
 * Represents the Home component.
 */
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * The generated secure code.
   */
  secureCode: string = '';

  /**
   * Initializes a new instance of the HomeComponent class.
   * Generates a secure code upon instantiation.
   */
  constructor() {
    this.generateSecureCode();
  }

  /**
   * Generates a secure random code consisting of uppercase and lowercase letters,
   * numbers, and special characters. The length of the code is 60 characters.
   */
  generateSecureCode(): void {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const length = 60;
    this.secureCode = Array.from({ length }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length)),
    ).join('');
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Mutes the video element on the page.
   */
  ngOnInit() {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = true; // Ensure the video is muted
    }
  }
}