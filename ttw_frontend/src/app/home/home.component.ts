import { Component, OnInit } from '@angular/core';
import { SecureCodeService } from '../services/token.service'; // Adjust path as necessary

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
   * The secure code fetched from the backend.
   */
  secureCode: string = '';

  /**
   * Initializes a new instance of the HomeComponent class.
   * @param secureCodeService Service to fetch secure codes from the backend.
   */
  constructor(private secureCodeService: SecureCodeService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Handles video muting and fetching the secure code.
   */
  ngOnInit(): void {
    this.muteVideo();
    this.fetchSecureCode();
  }

  /**
   * Mutes the video element on the page.
   */
  private muteVideo(): void {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = true; // Ensure the video is muted
    }
  }

  /**
   * Fetches the secure code from the backend using SecureCodeService.
   */
  private fetchSecureCode(): void {
    this.secureCodeService.getSecureToken().subscribe({
      next: (code) => {
        this.secureCode = code; // Update secureCode with the response
      },
      error: (err) => {
        console.error('Failed to fetch secure code:', err);
        this.secureCode = 'Error fetching code'; // Fallback message
      },
    });
  }
}
