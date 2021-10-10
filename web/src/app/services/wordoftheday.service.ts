import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WordOfTheDay } from '../models/wordoftheday';

@Injectable({
  providedIn: 'root'
})
export class WordOfTheDayService {

  private readonly wordofthedayUrl = environment.api + '/api/wordoftheday';
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(handler: HttpBackend) {
    this.httpClientAnonymous = new HttpClient(handler);
  }

  GetWordOfTheDay(): Observable<WordOfTheDay> {
    return this.httpClientAnonymous
      .get<WordOfTheDay>(this.wordofthedayUrl);
  }
}
