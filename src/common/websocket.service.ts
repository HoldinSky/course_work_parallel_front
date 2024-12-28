import { Injectable } from '@angular/core';
import {ServerAddress} from "./constants";

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket?: WebSocket;

  connect(): void {
    this.socket = new WebSocket(ServerAddress);
    console.log("connect -- WebSocket initialized");

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      this.handleMessage(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed. Reason:', event);
    };
  }

  send(data: ArrayBuffer | string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.error('WebSocket is not open. Cannot send data.');
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private handleMessage(message: string | ArrayBuffer): void {
    // Implement specific handling logic as per your API
  }
}
