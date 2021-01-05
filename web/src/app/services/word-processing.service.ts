import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordProcessingService {
  charactersToClean = [
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

  constructor() {}

  loopWordsToCleanAndRemoveNull(words: string[]): string[] {
    for (let index = 0; index < words.length; index++) {
      words[index] = this.cleanWordFromCharacters(words[index]);
    }

    words = this.removeEmptyAndNullFromWords(words);

    return words;
  }

  removeEmptyAndNullFromWords(words: string[]): string[] {
    var emptyRemoved = words.filter(function (word) {
      return word != '';
    });

    var nullRemoved = emptyRemoved.filter(function (word) {
      return word != null;
    });

    return nullRemoved;
  }

  cleanWordFromCharacters(word: string): string {
    for (let index = 0; index < this.charactersToClean.length; index++) {
      return (word = word.replaceAll(this.charactersToClean[index], ''));
    }
  }

  splitTextToSentences(text: string): string[] {
    var sentences = text.split('\n');
    return sentences;
  }

  splitSentencestoWords(sentence: string): string[] {
    var words = sentence.split(' ');
    return words;
  }

  splitWords(paragraph: string): string[] {
    var words = paragraph.split(' ');
    words = this.loopWordsToCleanAndRemoveNull(words);
    return words;
  }
}
