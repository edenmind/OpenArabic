import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Text } from '../../models/text';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextService } from '../../services/text.service';
import { TextVocabularyComponent } from '../vocabulary/text-vocabulary.component';
import { Arabic } from 'src/app/enums/arabic.enum';
import { Emojis } from 'src/app/enums/emojis.enum';

@Component({
  selector: 'app-text',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css'],
})
export class TextViewComponent implements OnInit {
  public text: Text = new Text;
  public showTextSpinner = true;
  public readonly spinnerColor: ThemePalette = 'accent';

  private lastSelectedEnglish = 0;
  private lastSelectedArabic = 0;
  private numberOfSelected = 0;

  public textId: string = String()

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private titleService: Title,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar) { }


  ngOnInit(): void {

    const queryParameter = "id";

    this.textId = this.route.snapshot.paramMap.get(queryParameter)!;

    this.textService.getText(this.textId).subscribe(
      text => {
        this.text = text
        const browserTitle = `${this.text.title} | ${this.text.author}`;
        this.titleService.setTitle(browserTitle);
        this.showTextSpinner = false
      }
    )
  }

  tapOnEnglish(index: number) {

    this.lastSelectedEnglish = index;

    let indexInArraryArabic = 0;

    for (let i = 0; i < this.text.vocabularyCollection.arabic.length; i++) {
      if (this.text.vocabularyCollection.arabic[i].wordId == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;

    for (let i = 0; i < this.text.vocabularyCollection.english.length; i++) {
      if (this.text.vocabularyCollection.english[i].wordId == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.text.vocabularyCollection.english[indexInArraryEnglish].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.text.vocabularyCollection.english[indexInArraryEnglish].selected) {
      this.text.vocabularyCollection.english[indexInArraryEnglish].selected = false;
    } else {
      this.text.vocabularyCollection.english[indexInArraryEnglish].selected = true;
    }

    if (this.lastSelectedArabic == index) {
      this.text.vocabularyCollection.english[indexInArraryEnglish].correct = true;
      this.text.vocabularyCollection.arabic[indexInArraryArabic].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let indexVocab = 0; indexVocab < this.text.vocabularyCollection.english.length; indexVocab++) {
        if (this.text.vocabularyCollection.english[indexVocab].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.text.vocabularyCollection.english.length) {
        const successMessage = 'Well Done - ' + Arabic.MashaAllah
        this.matSnackBar.open(successMessage, Emojis.Rockets, {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = 0;
      this.lastSelectedArabic = 0;
      for (let indexSelected = 0; indexSelected < this.text.vocabularyCollection.english.length; indexSelected++
      ) {
        this.text.vocabularyCollection.english[indexSelected].selected = false;
        this.text.vocabularyCollection.arabic[indexSelected].selected = false;
      }
    }
  }

  tapOnArabic(index: number) {

    this.lastSelectedArabic = index;

    let indexInArraryArabic = 0;
    for (let i = 0; i < this.text.vocabularyCollection.arabic.length; i++) {
      if (this.text.vocabularyCollection.arabic[i].wordId == index) {
        indexInArraryArabic = i;
      }
    }

    let indexInArraryEnglish = 0;
    for (let i = 0; i < this.text.vocabularyCollection.english.length; i++) {
      if (this.text.vocabularyCollection.english[i].wordId == index) {
        indexInArraryEnglish = i;
      }
    }

    if (this.text.vocabularyCollection.arabic[indexInArraryArabic].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.text.vocabularyCollection.arabic[indexInArraryArabic].selected) {
      this.text.vocabularyCollection.arabic[indexInArraryArabic].selected = false;
    } else {
      this.text.vocabularyCollection.arabic[indexInArraryArabic].selected = true;
    }

    if (this.lastSelectedEnglish == index) {
      this.text.vocabularyCollection.arabic[indexInArraryArabic].correct = true;
      this.text.vocabularyCollection.english[indexInArraryEnglish].correct = true;
      this.lastSelectedArabic = 0;
      this.lastSelectedEnglish = 0;
      this.numberOfSelected = 0;

      let numberOfCorrect = 0;
      for (let indexVocab = 0; indexVocab < this.text.vocabularyCollection.arabic.length; indexVocab++) {
        if (this.text.vocabularyCollection.arabic[indexVocab].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.text.vocabularyCollection.arabic.length) {
        const successMessage = 'Well Done - ' + Arabic.MashaAllah
        this.matSnackBar.open(successMessage, Emojis.Rockets, {
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
        indexSelected < this.text.vocabularyCollection.english.length;
        indexSelected++
      ) {
        this.text.vocabularyCollection.english[indexSelected].selected = false;
        this.text.vocabularyCollection.arabic[indexSelected].selected = false;
      }
    }
  }

  openVocabularyDialog(indexofSentence: number): void {
    const words = this.text.sentences.find((i) => i.sentenceId == indexofSentence)!.words;
    const emptyWordsRemoved = words.filter((w) => w.english != '');

    this.dialog.open(TextVocabularyComponent, {
      data: emptyWordsRemoved,
    });
  }
}
