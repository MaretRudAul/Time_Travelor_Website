import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  secureCode: string = '';

  constructor() {
    this.generateSecureCode();
  }

  generateSecureCode(): void {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const length = 60;
    this.secureCode = Array.from({ length }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length)),
    ).join('');
  }

  ngOnInit() {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = true; // Ensure the video is muted
      video.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
    }
  }
}
