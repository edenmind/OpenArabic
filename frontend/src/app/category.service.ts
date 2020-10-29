import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = [
    'Fiqh',
    'Aqîdah',
    'Minhadj',
    'Tafsir',
    'Tawhîd',
    'Hadîth',
    'Quran',
    'Ibadah',
    'Adab',
    'Ilm',
    'Sîrah',
  ];

  GetCategories() {
    var sorted = this.categories.sort();
    return sorted;
  }

  constructor() {}
}
