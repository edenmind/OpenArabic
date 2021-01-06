import { Word } from './word';
export class Sentence {
  sentenceId: number = 0;
  textId: number = 0;
  arabic: string = String();
  english: string = String();
  order: number = 0;
  words: Word[] = new Array();
}
