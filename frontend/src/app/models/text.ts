import { Sentence } from './sentence';
import { Word } from './word';

export class Text {
  textId: number;
  title: string;
  author: string;
  editor: string;
  category: string;
  source: string;
  createdAt: Date;
  timeAgo: string;
  status: string;
  englishText: string;
  arabicText: string;
  sentences: Sentence[];
}
