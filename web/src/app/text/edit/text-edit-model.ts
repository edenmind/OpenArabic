import { Sentence } from '../../models/sentence';
import { Text } from '../../models/text';

export class TextEditModel {
  sentences: Sentence[] = [];
  englishSentences: string[] = [];
  arabicSentences: string[] = [];
  arabicWordsForMatching: string[][] = [];
  englishWordsForMatching: string[][] = [];
  englishWordsMatched: string[][][] = [];
  sentencesAreEqual = false;
  text: Text = new Text();

}
