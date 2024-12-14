import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecureCodeService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches the secure token from the backend.
   */
  getSecureToken(): Observable<string> {
    return this.http.get<{ secure_code: string }>(`${this.apiUrl}generate-code/`).pipe(
      map((response) => response.secure_code) // Extract secure_code from response
    );
  }
}
