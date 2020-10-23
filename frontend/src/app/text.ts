import { Sentence } from './sentence';
export class Text {
  textId: number;
  title: string;
  author: string;
  category: String;
  sentences: Sentence[];
  createdAt: Date;
  timeAgo: string;
  status: string;
  englishParagraph: string;
  arabicParagraph: string;
}
