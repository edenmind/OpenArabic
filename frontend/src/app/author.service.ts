import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authors = ['Taqī ad-Dīn Aḥmad Ibn Taymiyyah', 'Ibn Qayyim al-Jawziyya'];

  GetAuthors() {
    return this.authors;
  }

  constructor() {}
}
