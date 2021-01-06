import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordProcessingService {
  charactersToClean: string[] = [
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

    const wordsNoEmptyOrNull = this.removeEmptyAndNullFromWords(words);

    return wordsNoEmptyOrNull;
  }

  removeEmptyAndNullFromWords(words: string[]): string[] {
    const emptyRemoved = words.filter(function (word) {
      return word != '';
    });

    const nullRemoved = emptyRemoved.filter(function (word) {
      return word != null;
    });

    return nullRemoved;
  }

  cleanWordFromCharacters(word: string): string {
    let wordCleaned: string = String();
    for (let index = 0; index < this.charactersToClean.length; index++) {
      wordCleaned = (word = word.replaceAll(this.charactersToClean[index], ''));
    }

    return wordCleaned
  }

  splitTextToSentences(text: string): string[] {
    const sentences = text.split('\n');
    return sentences;
  }

  splitSentencestoWords(sentence: string): string[] {
    const words = sentence.split(' ');
    return words;
  }

  splitWords(paragraph: string): string[] {
    const words = paragraph.split(' ');
    const wordsCleaned = this.loopWordsToCleanAndRemoveNull(words);
    return wordsCleaned;
  }

  insertSpaceAfterComma(text: string) {
    return text.replace(/,(?=[^\s])/g, ', ');
  }
}
