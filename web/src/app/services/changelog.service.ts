import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Changelog } from '../models/changelog';

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  private readonly changelogUrl = environment.api + '/api/changelog';
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(handler: HttpBackend) {
    this.httpClientAnonymous = new HttpClient(handler);
  }

  GetChangelog(): Observable<Changelog[]> {
    return this.httpClientAnonymous
      .get<Changelog[]>(this.changelogUrl);
  }
}
