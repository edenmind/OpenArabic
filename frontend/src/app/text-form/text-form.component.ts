import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Text } from '../text';
import { Sentence } from '../sentence';
import { TextService } from '../text.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { CategoryService } from '../category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusService } from '../status.service';
import { AuthService } from '@auth0/auth0-angular';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { exit } from 'process';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css'],
})
export class TextFormComponent implements OnInit, OnChanges {
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
  ngOnChanges(): void {
    this.englishSentences = this.splitSentences(this.model.englishParagraph);
    this.arabicSentences = this.splitSentences(this.model.arabicParagraph);
    console.log('a change occoured');
  }

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
    console.log('Updating preview.');
    var englishSentences = this.splitSentences(this.model.englishParagraph);
    var arabicSentences = this.splitSentences(this.model.arabicParagraph);

    if (englishSentences.length != arabicSentences.length) {
      console.log('Number of sentences does not match!');
    } else {
      console.log('Number of sentences do match!');
      this.sentences = [];

      for (let index = 0; index < englishSentences.length; index++) {
        var sentence = new Sentence();
        sentence.arabic = arabicSentences[index];
        sentence.english = englishSentences[index];

        this.sentences.push(sentence);
      }
      this.model.sentences = this.sentences;

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

      for (let index = 0; index < this.englishWords.length; index++) {
        this.englishWordsMatch[index] = new Array();
        for (
          let index2 = 0;
          index2 < this.englishWords[index].length;
          index2++
        ) {
          this.englishWordsMatch[index][index2] = new Array();
        }
      }
    }
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.textService
        .getText(this.id)
        .subscribe((text) => (this.model = text));
    }
  }

  onSubmit() {
    console.log('Submitted!');

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
