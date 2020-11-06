import { Component, OnChanges, OnInit } from '@angular/core';
import { Text } from '../models/text';
import { Words } from '../models/words';
import { Sentence } from '../models/sentence';
import { TextService } from '../services/text.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusService } from '../services/status.service';
import { AuthService } from '@auth0/auth0-angular';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css', '../shared/common.css'],
})
export class TextEditComponent implements OnInit, OnChanges {
  constructor(
    private textService: TextService,
    private authorService: AuthorService,
    private auth: AuthService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  model = new Text();
  id: string;

  authors = this.authorService.GetAuthors();
  statuses = this.statusService.GetStatuses();
  categories = this.categoryService.GetCategories();

  sentences: Sentence[] = new Array();

  englishSentences: string[] = new Array();
  arabicSentences: string[] = new Array();

  arabicWords: string[][] = new Array();
  englishWords: string[][] = new Array();

  englishWordsMatch: string[][][] = new Array();
  arabicWordsMatch: string[][][] = new Array();

  ngOnChanges(): void {
    this.englishSentences = this.splitSentences(this.model.englishParagraph);
    this.arabicSentences = this.splitSentences(this.model.arabicParagraph);
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

  updatePreview() {
    // Get english and arabic sentences from view
    var englishSentences = this.splitSentences(this.model.englishParagraph);
    var arabicSentences = this.splitSentences(this.model.arabicParagraph);

    if (englishSentences.length != arabicSentences.length) {
      console.log('Number of sentences does not match!');
    } else {
      this.model.sentences = this.combineSentences(
        englishSentences,
        arabicSentences
      );

      for (let index = 0; index < this.model.sentences.length; index++) {
        console.log('splitting words');
        this.arabicWords[index] = this.splitWords(
          this.model.sentences[index].arabic
        );
        this.englishWords[index] = this.splitWords(
          this.model.sentences[index].english
        );
      }

      console.log('english word: ' + this.englishWords.length);

      for (let index = 0; index < this.arabicWords.length; index++) {
        this.arabicWordsMatch[index] = new Array();
        for (
          let index2 = 0;
          index2 < this.arabicWords[index].length;
          index2++
        ) {
          this.arabicWordsMatch[index][index2] = new Array();
        }
      }
    }
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

      sentences.push(sentence);
    }
    return sentences;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.textService
        .getText(this.id)
        .subscribe((text) => (this.model = text));
    }
  }

  addBiWords() {
    this.model.wordByWord = new Array();
    for (let index = 0; index < this.arabicWordsMatch.length; index++) {
      var wordByWord: Words = new Words();
      for (
        let index2 = 0;
        index2 < this.arabicWordsMatch[index].length;
        index2++
      ) {
        wordByWord.wordList =
          wordByWord.wordList + this.arabicWords[index][index2] + ' ';
        for (
          let index3 = 0;
          index3 < this.arabicWordsMatch[index][index2].length;
          index3++
        ) {
          wordByWord.wordList =
            wordByWord.wordList +
            this.arabicWordsMatch[index][index2][index3] +
            ' ';
        }
      }
      wordByWord.wordList = wordByWord.wordList.replace('undefined', '');
      this.model.wordByWord[index] = wordByWord;
    }
  }

  onSubmit() {
    this.addBiWords();

    if (!this.model.textId) {
      this.auth.user$.subscribe((u) => (this.model.editor = u.email));
      this.textService.addText(this.model).subscribe((text) => {
        this.model = text;
        this.openSnackBar(
          'The text has been added with id: ' + this.model.textId + '.',
          'MashaAllah!'
        );
      });
    } else {
      this.textService.updateText(this.model).subscribe((text) => {
        this.model = text;
        this.openSnackBar(
          'The text has been updated with id: ' + this.model.textId + '.',
          'MashaAllah!'
        );
      });
    }

    this.route.navigate(['/']);
  }

  splitSentences(paragraph: string): string[] {
    var sentences = paragraph.split('*');
    return sentences;
  }

  splitWords(paragraph: string): string[] {
    var words = paragraph.split(' ');
    return words;
  }

  newText() {
    this.model = new Text();
  }

  deleteText() {
    this.textService.deleteText(this.model.textId);
    this.openSnackBar(
      'The text has been added with id: ' + this.model.textId + '.',
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
