import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(handler: HttpBackend) {
    this.httpClientAnonymous = new HttpClient(handler);
  }
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  sendMessage(message: Mail): void {
    const url = `${environment.api}/api/messages`;
    this.httpClientAnonymous.post<Mail>(url, message).subscribe((data) => {
      console.log(data);
    });
  }
}
