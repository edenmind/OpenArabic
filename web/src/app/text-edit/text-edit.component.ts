import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Sentence } from '../models/sentence';
import { Text } from '../models/text';
import { Word } from '../models/word';
import { AuthorService } from '../services/author.service';
import { CategoryService } from '../services/category.service';
import { StatusService } from '../services/status.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css', '../shared/common.css'],
})
export class TextEditComponent implements OnInit, OnChanges {
  constructor(
    private textService: TextService,
    private authorService: AuthorService,
    private authService: AuthService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  text = new Text();
  id: string;

  sentencesAreEqual: boolean;

  authors = this.authorService.GetAuthors();
  statuses = this.statusService.GetStatuses();
  categories = this.categoryService.GetCategories();

  sentences: Sentence[] = new Array();

  englishSentences: string[] = new Array();
  arabicSentences: string[] = new Array();

  arabicWordsForMatching: string[][] = new Array();
  englishWordsForMatching: string[][] = new Array();

  englishWordsMatched: string[][][] = new Array();

  ngOnChanges(): void {
    this.updatePreview();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public openTranslation(arabicWord: string) {
    var url =
      'https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=' +
      arabicWord;
    window.open(url, '_blank');
  }

  updatePreview() {
    // Get english and arabic sentences from view
    this.arabicWordsForMatching = [];
    this.englishWordsForMatching = [];
    this.englishWordsMatched = [];

    this.englishSentences = this.splitTextToSentences(this.text.englishText);
    this.arabicSentences = this.splitTextToSentences(this.text.arabicText);

    var englishSentences = this.splitTextToSentences(this.text.englishText);
    var arabicSentences = this.splitTextToSentences(this.text.arabicText);

    // Check in text to see if sentences are equal
    if (englishSentences.length != arabicSentences.length) {
      this.sentencesAreEqual = false;
    } else {
      this.sentencesAreEqual = true;
      // Combine eng and ar sentences into one array
      this.text.sentences = this.combineSentences(
        englishSentences,
        arabicSentences
      );

      // Split words into arabics and english before manual matching
      for (let index = 0; index < this.text.sentences.length; index++) {
        this.arabicWordsForMatching[index] = this.splitWords(
          this.text.sentences[index].arabic
        );
        this.englishWordsForMatching[index] = this.splitWords(
          this.text.sentences[index].english
        );
      }
    }

    // Create a arabic wordlist
    // TODO: There should be a better way...
    for (let index = 0; index < this.arabicWordsForMatching.length; index++) {
      this.englishWordsMatched[index] = new Array();
      for (
        let index2 = 0;
        index2 < this.arabicWordsForMatching[index].length;
        index2++
      ) {
        this.englishWordsMatched[index][index2] = new Array();
      }
    }
  }

  createWordList() {
    for (
      let sentenceIndex = 0;
      sentenceIndex < this.text.sentences.length;
      sentenceIndex++
    ) {
      this.text.sentences[sentenceIndex].words = new Array();
      for (
        let wordIndex = 0;
        wordIndex < this.arabicWordsForMatching[sentenceIndex].length;
        wordIndex++
      ) {
        var word = new Word();
        word.english = this.englishWordsMatched[sentenceIndex][wordIndex].join(
          ' '
        );
        word.arabic = this.arabicWordsForMatching[sentenceIndex][wordIndex];

        this.text.sentences[sentenceIndex].words.push(word);
      }
    }
  }

  public isValid(): boolean {
    return (
      this.text.author != null &&
      this.text.title != null &&
      this.text.category != null &&
      this.text.source != null &&
      this.text.sentences != null &&
      this.englishWordsForMatching != null &&
      this.text.title.length < 30
    );
  }

  private combineSentences(
    englishSentences: string[],
    arabicSentences: string[]
  ): Sentence[] {
    var sentences: Sentence[] = new Array();
    for (let index = 0; index < englishSentences.length; index++) {
      var sentence = new Sentence();
      sentence.arabic = arabicSentences[index];
      sentence.english = englishSentences[index];

      sentence.order = index;
      sentences.push(sentence);
    }

    return sentences;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.textService.getText(this.id).subscribe((text) => (this.text = text));
    }
  }

  onSubmit() {
    this.createWordList();

    if (!this.text.textId) {
      this.authService.user$.subscribe((u) => (this.text.editor = u.email));
      this.textService.addText(this.text).subscribe((text) => {
        console.log(this.text.sentences);
        this.text = text;
        this.openSnackBar(
          'The text has been added with id: ' + this.text.textId + '.',
          'MashaAllah!'
        );
      });
    } else {
      this.textService.updateText(this.text).subscribe((text) => {
        this.text = text;
        this.openSnackBar(
          'The text has been updated with id: ' + this.text.textId + '.',
          'MashaAllah!'
        );
      });
    }

    this.route.navigate(['/']);
  }

  splitTextToSentences(text: string): string[] {
    var sentences = text.split('\n');
    return sentences;
  }

  splitSentencestoWords(sentence: string): string[] {
    var words = sentence.split(' ');
    return words;
  }

  splitWords(paragraph: string): string[] {
    var words = paragraph.split(' ');
    words = this.cleanWords(words);
    return words;
  }

  cleanWords(words: string[]): string[] {
    for (let index = 0; index < words.length; index++) {
      words[index] = words[index].replaceAll(',', '');
      words[index] = words[index].replaceAll('.', '');
      words[index] = words[index].replaceAll('"', '');
      words[index] = words[index].replaceAll('،', '');
      words[index] = words[index].replaceAll('”', '');
      words[index] = words[index].replaceAll(' ', '');
      words[index] = words[index].replaceAll(':', '');
      words[index] = words[index].replaceAll(';', '');
      words[index] = words[index].replaceAll('*', '');
      words[index] = words[index].replaceAll('؛', '');
      words[index] = words[index].replaceAll('(', '');
      words[index] = words[index].replaceAll(')', '');
      words[index] = words[index].replaceAll('-', '');
      words[index] = words[index].replaceAll('“', '');
      words[index] = words[index].replaceAll('/', '');
    }

    var emptyRemoved = words.filter(function (word) {
      return word != '';
    });

    var nullRemoved = emptyRemoved.filter(function (word) {
      return word != null;
    });

    return nullRemoved;
  }

  newText() {
    this.text = new Text();
  }

  deleteText() {
    this.textService.deleteText(this.text.textId);
    this.openSnackBar(
      'The text has been added with id: ' + this.text.textId + '.',
      'MashaAllah!'
    );
    this.route.navigate(['/']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
