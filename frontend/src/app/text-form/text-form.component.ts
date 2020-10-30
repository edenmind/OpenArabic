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
import { async } from 'rxjs';

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
  ngOnChanges(changes: SimpleChanges): void {
    this.englishSentences = this.splitParagraphToSentences(
      this.model.englishParagraph
    );
    this.arabicSentences = this.splitParagraphToSentences(
      this.model.arabicParagraph
    );
    console.log('a change occoured');
  }

  model = new Text();
  id: string;
  authors = this.authorService.GetAuthors();
  statuses = this.statusService.GetStatuses();
  categories = this.categoryService.GetCategories();

  sentences: Sentence[] = new Array();
  englishSentences: string[];
  arabicSentences: string[];

  updatePreview() {
    var englishSentences = this.splitParagraphToSentences(
      this.model.englishParagraph
    );
    var arabicSentences = this.splitParagraphToSentences(
      this.model.arabicParagraph
    );

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
      this.textService.addText(this.model).subscribe((text) => {
        this.auth.user$.subscribe((u) => (this.model.editor = u.email));
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

  splitParagraphToSentences(paragraph: string): string[] {
    var sentences = paragraph.split('*');
    return sentences;
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
