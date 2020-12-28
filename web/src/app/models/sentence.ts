import { Word } from './word';
export class Sentence {
  sentenceId: number;
  textId: number;
  arabic: string;
  english: string;
  order: number;
  words: Word[];
}
