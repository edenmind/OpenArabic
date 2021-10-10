import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Arabic } from 'src/app/enums/arabic.enum';
import { Sentence } from '../../models/sentence';
import { Word } from '../../models/word';
import { AuthorService } from '../../services/author.service';
import { CategoryService } from '../../services/category.service';
import { StatusService } from '../../services/status.service';
import { TextService } from '../../services/text.service';
import { WordProcessingService } from '../../services/word-processing.service';
import { TextEditModel } from './text-edit-model';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css'],
})
export class TextEditComponent implements OnInit, OnChanges {
  constructor(
    private textService: TextService,
    private authorService: AuthorService,
    private authService: AuthService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private wordProcessingService: WordProcessingService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  public readonly authors = this.authorService.GetAuthors();
  public readonly statuses = this.statusService.GetStatuses();
  public readonly categories = this.categoryService.GetCategories();

  public textEditModel: TextEditModel = new TextEditModel();

  ngOnInit(): void {
    this.getText();
  }
  ngOnChanges(): void {
    if (this.textEditModel.sentencesAreEqual) {
      this.updatePreview();
    }
  }

  private getText(): void {
    const queryParameter = 'id'
    const id = this.activatedRoute.snapshot.paramMap.get(queryParameter);
    if (id) {
      this.textService
        .getText(id)
        .subscribe((text) => (this.textEditModel.text = text));
    }
  }

  onSubmit(): void {
    const updateSinceTextAlreadyExists = this.textEditModel.text.textId;
    if (updateSinceTextAlreadyExists) {
      this.updateText();
    } else {
      this.createWordList();
      this.addText();
    }
    this.route.navigate(['/']);
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

  public openTranslationOfArabicWord(arabicWord: string): void {
    const url = `https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=${arabicWord}`;
    window.open(url, '_blank');
  }

  updatePreview(): void {
    // Get english and arabic sentences from view
    this.textEditModel.arabicWordsForMatching = [];
    this.textEditModel.englishWordsForMatching = [];
    this.textEditModel.englishWordsMatched = [];

    this.textEditModel.englishSentences = this.wordProcessingService.splitTextToSentences(
      this.textEditModel.text.englishText
    );

    this.textEditModel.arabicSentences = this.wordProcessingService.splitTextToSentences(
      this.textEditModel.text.arabicText
    );

    const englishSentences = this.wordProcessingService.splitTextToSentences(
      this.textEditModel.text.englishText
    );
    const arabicSentences = this.wordProcessingService.splitTextToSentences(
      this.textEditModel.text.arabicText
    );

    // Check in text to see if sentences are equal
    if (englishSentences.length !== arabicSentences.length) {
      this.textEditModel.sentencesAreEqual = false;
    } else {
      this.textEditModel.sentencesAreEqual = true;
      // Combine eng and ar sentences into one array
      this.textEditModel.text.sentences = this.combineSentences(englishSentences, arabicSentences);

      // Split words into arabics and english before manual matching
      for (let index = 0; index < this.textEditModel.text.sentences.length; index++) {
        this.textEditModel.arabicWordsForMatching[index] = this.wordProcessingService.splitWords(
          this.textEditModel.text.sentences[index].arabic
        );
        this.textEditModel.englishWordsForMatching[index] = this.wordProcessingService.splitWords(
          this.textEditModel.text.sentences[index].english
        );
      }
    }

    // Create a arabic wordlist
    for (let index = 0; index < this.textEditModel.arabicWordsForMatching.length; index++) {

      this.textEditModel.englishWordsMatched[index] = [];

      for (let index2 = 0; index2 < this.textEditModel.arabicWordsForMatching[index].length; index2++) {
        this.textEditModel.englishWordsMatched[index][index2] = [];
      }
    }
  }

  createWordList(): void {
    for (let sentenceIndex = 0; sentenceIndex < this.textEditModel.text.sentences.length; sentenceIndex++) {

      this.textEditModel.text.sentences[sentenceIndex].words = [];

      for (let wordIndex = 0; wordIndex < this.textEditModel.arabicWordsForMatching[sentenceIndex].length; wordIndex++) {

        const word = new Word();
        word.english = this.textEditModel.englishWordsMatched[sentenceIndex][wordIndex].join(' ');
        word.arabic = this.textEditModel.arabicWordsForMatching[sentenceIndex][wordIndex];

        this.textEditModel.text.sentences[sentenceIndex].words.push(word);
      }
    }
  }

  public isModelValid(): boolean {
    return (
      this.textEditModel.text.author != null &&
      this.textEditModel.text.title != null &&
      this.textEditModel.text.category != null &&
      this.textEditModel.text.source != null &&
      this.textEditModel.text.sentences != null &&
      this.textEditModel.englishWordsForMatching != null &&
      this.textEditModel.text.title.length < 30
    );
  }

  private combineSentences(englishSentence: string[], arabicSentence: string[]): Sentence[] {

    const sentences: Sentence[] = [];

    for (let index = 0; index < englishSentence.length; index++) {
      const sentence = new Sentence();
      sentence.arabic = arabicSentence[index];
      sentence.english = englishSentence[index];

      sentence.order = index;
      sentences.push(sentence);
    }

    return sentences;
  }

  private updateText(): void {
    this.textService
      .updateText(this.textEditModel.text)
      .subscribe((textEditModeltext) => {
        this.textEditModel.text = textEditModeltext;
        const updateSuccessMessage = `The text has been updated with id: ${this.textEditModel.text.textId}.`
        this.openSnackBar(updateSuccessMessage, Arabic.MashaAllah);
      });
  }

  private addText(): void {

    // TODO: Fix when Auth0 is updated.
    //this.authService.user$.subscribe((u) => (this.textEditModel.text.editor = u.email));
    this.authService.user$.subscribe(() => (this.textEditModel.text.editor = "yunus@edenmind.com"));

    this.textService.addText(this.textEditModel.text).subscribe((text) => {
      this.textEditModel.text = text;
      const addSuccessMessage = `The text has been added with id: ${this.textEditModel.text.textId}.`;
      this.openSnackBar(addSuccessMessage, Arabic.MashaAllah);
    });
  }

  deleteText(): void {
    this.textService.deleteText(this.textEditModel.text.textId);
    const deleteSuccessMessage = `The text has been deleted with id: ${this.textEditModel.text.textId}.`;
    this.openSnackBar(deleteSuccessMessage, Arabic.MashaAllah);
    this.route.navigate(['/']);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
