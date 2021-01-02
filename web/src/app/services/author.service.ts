import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authors = [
    'Abdur Raūf Al-Manāwi',
    'al-Ġazālī',
    'al-Fuḍayl ibn ʻIyāḍ',
    'al-Hasan al-Basri',
    'Ibn Taymiyyah',
    'Ibn Qayyim al-Jawziyya',
    'Ibn Rajab al-Hanbali',
    'Imām Aḥmad ibn Ḥanbal ',
    'Imām al-Shāfiʿī',
    'Imām Mālik ibn Anas',
    'Imām Nawawī',
    'Muhammad al-Bukhari',
    'Ibn Kathīr',
    'Ibn Ḥajar al-ʿAsqalānī',
    'Abu Abdullah Al-Qurtubi',
    'Muhammad ibn Jarir al-Tabari',
    'Ibn al-Jawzī',
    'Shams ad-Dīn adh-Dhahabī',
  ];

  GetAuthors() {
    var sorted = this.authors.sort();
    return sorted;
  }

  constructor() {}
}
