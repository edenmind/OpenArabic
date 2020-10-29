import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authors = [
    'Ibn Taymiyyah',
    'Ibn Qayyim al-Jawziyya',
    'Ibn Rajab al-Hanbali',
    'Imam Nawawī',
    'Muhammad al-Bukhari',
    'Ibn Kathīr',
    'Ibn Ḥajar al-ʿAsqalānī',
    'Abu Abdullah Al-Qurtubi',
  ];

  GetAuthors() {
    var sorted = this.authors.sort();
    return sorted;
  }

  constructor() {}
}
