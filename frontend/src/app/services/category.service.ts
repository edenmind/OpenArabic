import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = [
    'Adab',
    'ʿAqīdah',
    'Fiqh',
    'Hadīth',
    'ʿIbādah',
    'ʿIlm',
    'Minhadj',
    'Qurʼān',
    'Sīrah',
    'Tafsīr',
    'Tawhīd',
  ];

  GetCategories() {
    return this.categories;
  }

  constructor() {}
}
