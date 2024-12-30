import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent implements OnInit {
  isHomePage: boolean = false;
  username: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Listen to route changes to determine the current page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });

    // Subscribe to username from AuthService
    this.authService.getUsername().subscribe(
      (name) => {
        this.username = name;
      },
      (error) => {
        console.error('Error fetching username:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to homepage after logout
  }
}