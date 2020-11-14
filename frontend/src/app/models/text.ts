import { Sentence } from './sentence';

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
