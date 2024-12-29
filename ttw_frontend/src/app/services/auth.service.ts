import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth'; // Adjust the URL as needed

  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(this.getStoredToken());
    this.user$ = this.userSubject.asObservable();
  }

  private getStoredToken(): any {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  }

  login(username: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { username, password };
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login/`, body, { headers })
      .pipe(
        map((response) => {
          console.log('Login response:', response); // Log response
          localStorage.setItem('token', response.token);
          this.userSubject.next(response);
          return response;
        }),
        catchError((error: any) => {
          console.error('Login error:', error); // Log error
          return throwError('Invalid username or password.');
        })
      );
  }

  signup(username: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { username, password };
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/signup/`, body, { headers })
      .pipe(
        map((response) => {
          console.log('Signup response:', response); // Log response
          localStorage.setItem('token', response.token);
          this.userSubject.next(response);
          return response;
        }),
        catchError((error: any) => {
          let errorMsg = 'Signup failed. Please try again.';
          if (error.error.username) {
            errorMsg = error.error.username[0];
          } else if (error.error.detail) {
            errorMsg = error.error.detail;
          }
          console.error('Signup error:', error); // Log error
          return throwError(errorMsg);
        })
      );
  }

  getUsername(): Observable<string> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage.');
      return throwError('No token found.');
    }

    console.log('Using token for getUsername:', token);

    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http
      .get<{ username: string }>(`${this.apiUrl}/username/`, { headers })
      .pipe(
        map((response: { username: string }) => {
          console.log('getUsername response:', response);
          return response.username;
        }),
        catchError((error: any) => {
          console.error('getUsername error:', error);
          return throwError('Failed to retrieve username.');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    console.log('User logged out.');
  }
}
