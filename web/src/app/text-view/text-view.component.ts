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
      text => {
        this.text = text
        this.arabicVocabulary = this.text.vocabularyCollection.arabic
        this.englishVocabulary = this.text.vocabularyCollection.english
        this.titleService.setTitle(`${this.text.title} | ${this.text.author}`)
        this.showTextSpinner = false
      }
    )
  }
  tapOnEnglish(index: number) {

    this.lastSelectedEnglish = index;

    let indexInArraryArabic = 0;

    for (let i = 0; i < this.arabicVocabulary.length; i++) {
      if (this.arabicVocabulary[i].wordId == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;

    for (let i = 0; i < this.englishVocabulary.length; i++) {
      if (this.englishVocabulary[i].wordId == index) {
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
      if (this.arabicVocabulary[i].wordId == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;
    for (let i = 0; i < this.englishVocabulary.length; i++) {
      if (this.englishVocabulary[i].wordId == index) {
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
}
