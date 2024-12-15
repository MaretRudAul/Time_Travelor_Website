import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecureCodeService {
  private websocket: WebSocket | null = null;
  private reconnectInterval: number = 5000; // Reconnect every 5 seconds if disconnected
  private readonly websocketUrl: string = 'ws://127.0.0.1:8000/ws/token-updates/';

  constructor() {
    this.initWebSocket();
  }

  /**
   * Initializes the WebSocket connection and sets up handlers.
   */
  private initWebSocket(): void {
    this.websocket = new WebSocket(this.websocketUrl);
  
    this.websocket.onopen = () => {
      console.log('WebSocket connection established');
    };
  
    this.websocket.onclose = (event) => {
      console.warn('WebSocket closed. Attempting to reconnect...', event.reason);
      setTimeout(() => this.initWebSocket(), this.reconnectInterval);
    };
  
    this.websocket.onerror = (error) => {
      console.error('WebSocket error occurred:', error);
    };
  }
  
  listenForUpdates(callback: (token: string) => void): void {
    if (this.websocket) {
      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data.secure_code); // Pass the token to the provided callback
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } else {
      console.warn('WebSocket is not initialized yet.');
    }
  }  
}
