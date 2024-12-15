import { Component, OnInit } from '@angular/core';
import { SecureCodeService } from '../services/token.service';

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
   * The secure code received from the WebSocket.
   */
  secureCode: string = '';

  constructor(private secureCodeService: SecureCodeService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    this.muteVideo();

    // Listen for secure code updates
    this.secureCodeService.listenForUpdates((token: string) => {
      this.secureCode = token; // Update secure code whenever a new one is received
    });
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
}
