import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  shuffleArray(array: any[]): any[] {

    let randomizedArray: any[] = new Array()

    for (var index = array.length - 1; index > 0; index--) {
      const randomNumber = Math.floor(Math.random() * (index + 1));
      const temporaryArray = array[index];
      randomizedArray[index] = array[randomNumber];
      randomizedArray[randomNumber] = temporaryArray;
    }
    return randomizedArray
  }
}
