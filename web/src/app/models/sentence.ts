import { Word } from './word';
export class Sentence {
  sentenceId: number;
  textId: number;
  arabic: string;
  english: string;
  words: Word[];
}
