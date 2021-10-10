import { Word } from './word';
export class Sentence {
  sentenceId = 0;
  textId = 0;
  arabic: string = String();
  english: string = String();
  order = 0;
  words: Word[] = [];
}
