import { Related } from './related';
import { Sentence } from './sentence';

export class Text {
  textId: number = 0;
  title: string = String();
  author: string = String();
  editor: string = String();
  category: string = String();
  source: string = String(9);
  createdAt!: Date;
  timeAgo: string = String();
  status: string = String();
  englishText: string = String();
  arabicText: string = String();
  sentences: Sentence[] = new Array();
  relatedTexts: Related[] = new Array();
}
