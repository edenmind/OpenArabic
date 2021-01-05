import { Sentence } from '../models/sentence';
import { Text } from '../models/text';

export class TextEditModel {
  sentences: Sentence[] = new Array();
  englishSentences: string[] = new Array();
  arabicSentences: string[] = new Array();
  arabicWordsForMatching: string[][] = new Array();
  englishWordsForMatching: string[][] = new Array();
  englishWordsMatched: string[][][] = new Array();
  text: Text = new Text();
}
