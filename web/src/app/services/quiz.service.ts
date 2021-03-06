import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  shuffleArray(array: any[]): any[] {

    for (let index = array.length - 1; index > 0; index--) {
      const randomNumber = Math.floor(Math.random() * (index + 1));
      const temporaryArray = array[index];
      array[index] = array[randomNumber];
      array[randomNumber] = temporaryArray;
    }
    return array;
  }

}
