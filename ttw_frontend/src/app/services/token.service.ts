// src/app/services/token.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecureCodeService implements OnDestroy {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  private websocket: WebSocket | null = null;
  private reconnectInterval: number = 5000; // Reconnect every 5 seconds if disconnected
  private readonly websocketUrl: string = 'ws://127.0.0.1:8000/ws/token-updates/';

  constructor(private http: HttpClient) {
    this.initWebSocket();
  }

  /**
   * Initializes the WebSocket connection and sets up handlers.
   */
  private initWebSocket(): void {
    this.websocket = new WebSocket(this.websocketUrl);

    this.websocket.onopen = () => {
      console.log('WebSocket connection established');
      // Optionally, request the current token upon connection
      // this.websocket?.send(JSON.stringify({ action: 'get_current_token' }));
    };

    this.websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.secure_code) {
          this.tokenSubject.next(data.secure_code); // Update the BehaviorSubject
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error occurred:', error);
    };

    this.websocket.onclose = (event) => {
      console.warn(`WebSocket closed: ${event.reason}. Reconnecting in ${this.reconnectInterval / 1000} seconds...`);
      this.websocket = null;
      setTimeout(() => this.initWebSocket(), this.reconnectInterval);
    };
  }

  /**
   * Fetches the current token via HTTP.
   * @returns Observable emitting the current token.
   */
  getCurrentToken(): Observable<string | null> {
    // Replace '/api/get-token/' with your actual API endpoint
    return this.http.get<{ token: string }>('/api/get-token/').pipe(
      // Map the response to extract the token
      map(response => response.token),
      // Handle errors
      catchError(error => {
        console.error('Error fetching current token:', error);
        return of(null);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}
