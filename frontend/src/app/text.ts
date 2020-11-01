import { Sentence } from './sentence';
import { Words } from './words';
export class Text {
  textId: number;
  title: string;
  author: string;
  editor: string;
  category: string;
  source: string;
  sentences: Sentence[];
  createdAt: Date;
  timeAgo: string;
  status: string;
  englishParagraph: string;
  arabicParagraph: string;
  wordByWord: Words[];
}
