import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private readonly issuesUrl = environment.api + '/api/issues';
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    handler: HttpBackend
  ) {
    this.httpClientAnonymous = new HttpClient(handler);
  }

  GetIssues(): Observable<Issue[]> {
    return this.httpClientAnonymous
      .get<Issue[]>(this.issuesUrl);
  }

}
