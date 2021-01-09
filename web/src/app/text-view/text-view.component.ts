import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Text } from '../models/text';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextService } from '../services/text.service';
import { TextVocabularyComponent } from '../text-vocabulary/text-vocabulary.component';
import { Vocab } from '../models/vocab';
import { QuizService } from '../services/quiz.service';
import { Sentence } from '../models/sentence';

@Component({
  selector: 'app-text',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css', '../shared/common.css'],
})
export class TextViewComponent implements OnInit {
  public text: Text = new Text;
  public showTextSpinner = true;
  public readonly spinnerColor: ThemePalette = 'accent';

  public english: Vocab[] = [];
  public arabic: Vocab[] = [];

  public lastSelectedEnglish = 0;
  public lastSelectedArabic = 0;
  public numberOfSelected = 0;

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private titleService: Title,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    const id = this.getIdFromRoute();
    this.getTextsAndPrepareUI(id);
  }

  private getIdFromRoute(): string {
    return this.route.snapshot.paramMap.get('id') || '1';
  }

  private getTextsAndPrepareUI(id: string): void {

    this.textService.getText(id).subscribe(
      (text) => (
        this.text = text,
        this.text.sentences = this.sortSentencesByOrder(this.text.sentences), //TODO Move to backend
        this.titleService.setTitle(`${text.title} | ${text.author}`),
        this.produceVocabularyList(), //TODO Move to backend
        this.arabic = this.quizService.shuffleArray(this.arabic), //TODO Move to backend
        this.english = this.quizService.shuffleArray(this.english), //TODO Move to backend
        this.setSpinneToFalse()
      )
    );
  }

  private sortSentencesByOrder(sentences: Sentence[]): Sentence[] {
    return (sentences.sort((n1, n2) => {
      if (n1.order > n2.order) {
        return 1;
      }
      if (n1.order < n2.order) {
        return -1;
      }
      return 0;
    }));
  }

  tapOnEnglish(index: number) {

    this.lastSelectedEnglish = index;

    let indexInArraryArabic = 0;

    for (let i = 0; i < this.arabic.length; i++) {
      if (this.arabic[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;

    for (let i = 0; i < this.english.length; i++) {
      if (this.english[i].id == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.english[indexInArraryEnglish].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.english[indexInArraryEnglish].selected) {
      this.english[indexInArraryEnglish].selected = false;
    } else {
      this.english[indexInArraryEnglish].selected = true;
    }

    if (this.lastSelectedArabic == index) {
      this.english[indexInArraryEnglish].correct = true;
      this.arabic[indexInArraryArabic].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let index = 0; index < this.english.length; index++) {
        if (this.english[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.english.length) {
        this.matSnackBar.open('Well Done - MashaAllah! ', '🚀🚀🚀', {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = 0;
      this.lastSelectedArabic = 0;
      for (let indexSelected = 0; indexSelected < this.english.length; indexSelected++
      ) {
        this.english[indexSelected].selected = false;
        this.arabic[indexSelected].selected = false;
      }
      return;
    }
  }

  tapOnArabic(index: number) {

    this.lastSelectedArabic = index;

    let indexInArraryArabic = 0;
    for (let i = 0; i < this.arabic.length; i++) {
      if (this.arabic[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;
    for (let i = 0; i < this.english.length; i++) {
      if (this.english[i].id == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.arabic[indexInArraryArabic].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.arabic[indexInArraryArabic].selected) {
      this.arabic[indexInArraryArabic].selected = false;
    } else {
      this.arabic[indexInArraryArabic].selected = true;
    }

    if (this.lastSelectedEnglish == index) {
      this.arabic[indexInArraryArabic].correct = true;
      this.english[indexInArraryEnglish].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let index = 0; index < this.arabic.length; index++) {
        if (this.arabic[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.arabic.length) {
        this.matSnackBar.open('Well Done - MashaAllah! ', '🚀🚀🚀', {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = 0;
      this.lastSelectedArabic = 0;
      for (
        let indexSelected = 0;
        indexSelected < this.english.length;
        indexSelected++
      ) {
        this.english[indexSelected].selected = false;
        this.arabic[indexSelected].selected = false;
      }
      return;
    }
  }

  openVocabularyDialog(indexofSentence: number): void {
    const words = this.text.sentences.find((i) => i.sentenceId == indexofSentence)!.words;
    const filteredWords = words.filter((w) => w.english != '');

    this.dialog.open(TextVocabularyComponent, {
      data: filteredWords,
    });
  }


  produceVocabularyList(): void {
    let numberOfGenerations = 0;
    const randomNumbers: number[] = [];

    for (let index = 0; index < 10; index++) {
      const randomNumber = Math.floor(Math.random() * this.text.sentences.length);
      if (!randomNumbers.includes(randomNumber)) {
        this.GetWordsFromSentences(randomNumber);
        numberOfGenerations = numberOfGenerations + 1;
        randomNumbers.push(randomNumber);
      }
      if (numberOfGenerations == 3) {
        break;
      }
    }


  }

  private GetWordsFromSentences(sentenceNumber: number): void {

    for (let index = 0; index < this.text.sentences[sentenceNumber].words.length; index++) {
      const english = new Vocab();
      english.word = this.text.sentences[sentenceNumber].words[index].english;
      english.id = this.english.length + 1;

      const arabic = new Vocab();
      arabic.word = this.text.sentences[sentenceNumber].words[index].arabic;
      arabic.id = this.arabic.length + 1;

      if (arabic.word.length > 2 && english.word.length > 2) {
        this.arabic.push(arabic);
        this.english.push(english);
      }
    }
  }

  // TODO: This should not be necessary maybe look if text is null?
  setSpinneToFalse(): void {
    this.delay(300);
    this.showTextSpinner = false;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
