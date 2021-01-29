import { HttpBackend, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  private readonly textsUrl = environment.api + '/api/texts';
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
  getTextsFromEndpoint(
    endpointKey: string,
    endPointValue: string,
    pageSize: string = "25",
    pageNumber: string = "1"
  ): Observable<HttpResponse<Text[]>> {

    const paginationData = `&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    const endpointKeyWithValue = `?${endpointKey}=${endPointValue}`;
    const requestUrl = this.textsUrl + endpointKeyWithValue + paginationData;

    return this.httpClientAnonymous
      .get<Text[]>(requestUrl, { observe: 'response' });
  }

  getTextsFromRoot(
    pageSize: string = "25",
    pageNumber: string = "1"
  ): Observable<HttpResponse<Text[]>> {

    const paginationData = `?&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    const requestUrl = this.textsUrl + paginationData;

    return this.httpClientAnonymous
      .get<Text[]>(requestUrl, { observe: 'response' });
  }

  getText(id: string): Observable<Text> {
    const url = `${this.textsUrl}/${id}`;
    return this.httpClientAnonymous.get<Text>(url);
  }

  addText(text: Text): Observable<Text> {
    return this.http.post<Text>(this.textsUrl, text, this.httpOptions).pipe(
      tap((newText: Text) => this.log(`added text w/ id=${newText.textId}`)),
      catchError(this.handleError<Text>('addText'))
    );
  }

  updateText(text: Text): Observable<any> {
    const sectionedUrl = `${environment.api}/api/texts/${text.textId}`;
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

  private log(message: string): void {
    console.log(`TextService: ${message}`);
  }
}
