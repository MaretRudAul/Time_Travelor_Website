import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements AfterViewInit {
  title = 'ttw_frontend';
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.muteVideo();
  }

  muteVideo(): void {
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      this.backgroundVideo.nativeElement.muted = true;
      console.log('Background video muted.');
    } else {
      console.error('Background video element not found.');
    }
  }
}
