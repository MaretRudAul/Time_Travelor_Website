import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Use this instead of HttpClientModule
    provideRouter([
      { path: '', component: HomeComponent }, // Home page
      { path: 'login', component: LoginComponent }, // Login page
    ]),
  ],
}).catch((err) => console.error(err));
