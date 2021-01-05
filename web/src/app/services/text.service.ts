import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Text } from '../models/text';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textsUrl = environment.api + '/api/texts';
  private httpClientAnonymous: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    handler: HttpBackend
  ) {
    this.httpClientAnonymous = new HttpClient(handler);
  }

  /** GET texts from the server */
  getTexts(
    author: string = 'empty',
    category: string = 'empty',
    pageSize: number = 25,
    pageNumber: number = 1
  ): Observable<Text[]> {
    var sectionedUrl = `${environment.api}/api/texts/?pageSize=${pageSize}&pageNumber=${pageNumber}`;

    if (category != 'empty') {
      sectionedUrl = `${this.textsUrl}?category=${category}`;
    }

    if (author != 'empty') {
      sectionedUrl = `${this.textsUrl}?author=${author}`;
    }

    return this.httpClientAnonymous
      .get<Text[]>(sectionedUrl)
      .pipe(tap((_) => this.log('fetched texts')));
  }

  getText(id: string): Observable<Text> {
    const url = `${this.textsUrl}/${id}`;
    return this.httpClientAnonymous.get<Text>(url).pipe(
      tap((_) => this.log(`fetched text id=${id}`)),
      catchError(this.handleError<Text>(`getText id=${id}`))
    );
  }

  addText(text: Text): Observable<Text> {
    return this.http.post<Text>(this.textsUrl, text, this.httpOptions).pipe(
      tap((newText: Text) => this.log(`added text w/ id=${newText.textId}`)),
      catchError(this.handleError<Text>('addText'))
    );
  }

  updateText(text: Text): Observable<any> {
    var sectionedUrl = `${environment.api}/api/texts/${text.textId}`;
    return this.http.put(sectionedUrl, text, this.httpOptions).pipe(
      tap((_) => this.log(`updated text id=${text.textId}`)),
      catchError(this.handleError<any>('updateText'))
    );
  }

  deleteText(id: number) {
    const url = `${this.textsUrl}/${id}`;
    return this.http.delete<Text>(url, this.httpOptions).subscribe((s) => {
      console.log(s);
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`TextService: ${message}`);
  }
}
