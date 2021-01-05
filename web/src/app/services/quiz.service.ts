import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  shuffleArray(array: any): any {
    for (var index = array.length - 1; index > 0; index--) {
      var randomNumber = Math.floor(Math.random() * (index + 1));
      var temp = array[index];
      array[index] = array[randomNumber];
      array[randomNumber] = temp;
    }
    return array
  }
}
