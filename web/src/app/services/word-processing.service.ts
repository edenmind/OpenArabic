import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordProcessingService {
  private readonly charactersToClean: string[] = [
    ',',
    '.',
    ',',
    '،',
    '”',
    ' ',
    ':',
    ';',
    '*',
    '؛',
    '(',
    ')',
    '-',
    '“',
    '/',
    '؟',
    '–',
    '‘',
    '’',
    '...',
    '[',
    ']',
    '،',
  ];

  constructor() { }

  loopWordsToCleanAndRemoveNull(words: string[]): string[] {

    for (let index = 0; index < words.length; index++) {
      words[index] = this.cleanWordFromCharacters(words[index]);
    }

    return this.removeEmptyAndNullFromWords(words);
  }

  removeEmptyAndNullFromWords(words: string[]): string[] {
    const emptyRemoved = words.filter(word => word !== '');

    const nullRemoved = emptyRemoved.filter(word => word != null);

    return nullRemoved;
  }

  cleanWordFromCharacters(word: string): string {
    let wordCleaned: string = String();
    this.charactersToClean.forEach(item => {
      wordCleaned = (word = word.replaceAll(item, ''));
    });

    return wordCleaned;
  }

  splitTextToSentences(text: string): string[] {
    return text.split('\n');
  }

  splitWords(paragraph: string): string[] {
    const words = paragraph.split(' ');
    const wordsCleaned = this.loopWordsToCleanAndRemoveNull(words);
    return wordsCleaned;
  }
}
