import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = ['Fiqh', 'Aqîdah', 'Minhadj', 'Tafsir'];

  GetCategories() {
    return this.categories;
  }

  constructor() {}
}
