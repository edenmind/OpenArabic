import { Related } from './related';
import { Sentence } from './sentence';
import { VocabularyCollection } from './vocabulary';

export class Text {
  textId = 0;
  title: string = String();
  author: string = String();
  editor: string = String();
  category: string = String();
  source: string = String();
  createdAt!: Date;
  timeAgo: string = String();
  status: string = String();
  englishText: string = String();
  arabicText: string = String();
  vocabularyCollection: VocabularyCollection = new VocabularyCollection;
  sentences: Sentence[] = [];
  relatedTexts: Related[] = [];
}
