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

  private url = environment.api + '/api/messages';
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  sendMessage(message: Mail) {
    this.httpClientAnonymous.post<any>(this.url, message).subscribe((data) => {
      console.log(data); //TODO: Show result in UI
    });
  }
}
