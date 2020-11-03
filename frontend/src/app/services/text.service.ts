import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Text } from '../models/text';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, concatMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';

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
    pageSize: number = 5,
    pageNumber: number = 1
  ): Observable<Text[]> {
    console.log('getting texts');
    var sectionedUrl =
      environment.api +
      '/api/texts/?pageSize=' +
      pageSize +
      '&pageNumber=' +
      pageNumber;
    if (category != 'empty') {
      sectionedUrl = this.textsUrl + '?category=' + category;
      console.log('category empty');
    }

    if (author != 'empty') {
      sectionedUrl = this.textsUrl + '?author=' + author;
      console.log('author empty');
    }

    console.log('the url:' + this.textsUrl);

    return this.httpClientAnonymous.get<Text[]>(sectionedUrl).pipe(
      tap((_) => this.log('fetched texts'))
      // catchError(this.handleError<Text[]>('getTexts', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getText(id: string): Observable<Text> {
    const url = `${this.textsUrl}/${id}`;
    console.log('second get: ' + url);
    return this.httpClientAnonymous.get<Text>(url).pipe(
      tap((_) => this.log(`fetched text id=${id}`)),
      catchError(this.handleError<Text>(`getText id=${id}`))
    );
  }

  addText(text: Text): Observable<Text> {
    console.log('Send text: ' + text);
    return this.http.post<Text>(this.textsUrl, text, this.httpOptions).pipe(
      tap((newText: Text) => this.log(`added text w/ id=${newText.textId}`)),
      catchError(this.handleError<Text>('addText'))
    );
  }

  /** PUT: update the hero on the server */
  updateText(text: Text): Observable<Text> {
    console.log('text id to update: ' + text.textId);
    var sectionedUrl = environment.api + '/api/texts' + '/' + text.textId;
    return this.http.put(sectionedUrl, text, this.httpOptions).pipe(
      tap((_) => this.log(`updated text id=${text.textId}`)),
      catchError(this.handleError<any>('updateText'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteText(id: number) {
    const url = `${this.textsUrl}/${id}`;
    return this.http.delete<Text>(url, this.httpOptions).subscribe((s) => {
      console.log(s);
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TextService message with the MessageService */
  private log(message: string) {
    console.log(`TextService: ${message}`);
  }
}
