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

  public englishVocabulary: Vocab[] = [];
  public arabicVocabulary: Vocab[] = [];

  public lastSelectedEnglish = 0;
  public lastSelectedArabic = 0;
  public numberOfSelected = 0;

  public id: string = String()

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
    this.id = this.getIdFromRoute();
    this.getTextsAndPrepareUI(this.id);
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
        this.arabicVocabulary = this.quizService.shuffleArray(this.arabicVocabulary), //TODO Move to backend
        this.englishVocabulary = this.quizService.shuffleArray(this.englishVocabulary), //TODO Move to backend
        this.showTextSpinner = false
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

    for (let i = 0; i < this.arabicVocabulary.length; i++) {
      if (this.arabicVocabulary[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;

    for (let i = 0; i < this.englishVocabulary.length; i++) {
      if (this.englishVocabulary[i].id == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.englishVocabulary[indexInArraryEnglish].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.englishVocabulary[indexInArraryEnglish].selected) {
      this.englishVocabulary[indexInArraryEnglish].selected = false;
    } else {
      this.englishVocabulary[indexInArraryEnglish].selected = true;
    }

    if (this.lastSelectedArabic == index) {
      this.englishVocabulary[indexInArraryEnglish].correct = true;
      this.arabicVocabulary[indexInArraryArabic].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let index = 0; index < this.englishVocabulary.length; index++) {
        if (this.englishVocabulary[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.englishVocabulary.length) {
        this.matSnackBar.open('Well Done - MashaAllah! ', '🚀🚀🚀', {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = 0;
      this.lastSelectedArabic = 0;
      for (let indexSelected = 0; indexSelected < this.englishVocabulary.length; indexSelected++
      ) {
        this.englishVocabulary[indexSelected].selected = false;
        this.arabicVocabulary[indexSelected].selected = false;
      }
      return;
    }
  }

  tapOnArabic(index: number) {

    this.lastSelectedArabic = index;

    let indexInArraryArabic = 0;
    for (let i = 0; i < this.arabicVocabulary.length; i++) {
      if (this.arabicVocabulary[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;
    for (let i = 0; i < this.englishVocabulary.length; i++) {
      if (this.englishVocabulary[i].id == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.arabicVocabulary[indexInArraryArabic].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.arabicVocabulary[indexInArraryArabic].selected) {
      this.arabicVocabulary[indexInArraryArabic].selected = false;
    } else {
      this.arabicVocabulary[indexInArraryArabic].selected = true;
    }

    if (this.lastSelectedEnglish == index) {
      this.arabicVocabulary[indexInArraryArabic].correct = true;
      this.englishVocabulary[indexInArraryEnglish].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let index = 0; index < this.arabicVocabulary.length; index++) {
        if (this.arabicVocabulary[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.arabicVocabulary.length) {
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
        indexSelected < this.englishVocabulary.length;
        indexSelected++
      ) {
        this.englishVocabulary[indexSelected].selected = false;
        this.arabicVocabulary[indexSelected].selected = false;
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

    const randomNumbers: number[] = [];

    for (let index = 0; this.arabicVocabulary.length < 5; index++) {

      const randomNumber = Math.floor(Math.random() * this.text.sentences.length);

      if (!randomNumbers.includes(randomNumber)) {
        this.GetWordsFromSentences(randomNumber);
        randomNumbers.push(randomNumber);
      }
    }
  }

  private GetWordsFromSentences(sentenceNumber: number): void {

    for (let index = 0; index < this.text.sentences[sentenceNumber].words.length; index++) {
      const english = new Vocab();
      english.word = this.text.sentences[sentenceNumber].words[index].english;
      english.id = this.englishVocabulary.length + 1;

      const arabic = new Vocab();
      arabic.word = this.text.sentences[sentenceNumber].words[index].arabic;
      arabic.id = this.arabicVocabulary.length + 1;

      const arabicWordLongerThanTwo = arabic.word.length > 2;
      const englishWordLongerThanTwo = english.word.length > 2;

      let wordExistsInVocabulary: boolean = false;

      this.arabicVocabulary.forEach(element => {
        if (element.word === arabic.word) {
          wordExistsInVocabulary = true
        }
      });

      if (arabicWordLongerThanTwo && englishWordLongerThanTwo && !wordExistsInVocabulary) {
        this.arabicVocabulary.push(arabic);
        this.englishVocabulary.push(english);
      }

      const vocabHaveReachedFive = this.arabicVocabulary.length === 5;

      if (vocabHaveReachedFive) {
        break
      }
    }
  }
}
