import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust path if needed

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
    return this.http.get<string>(`${this.apiUrl}secure-code/`);
  }
}
