import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Text } from '../models/text';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextService } from '../services/text.service';
import { TextVocabularyComponent } from '../text-vocabulary/text-vocabulary.component';

export class Vocab {
  word: string;
  id: number;
  correct: boolean = false;
  selected: boolean = false;
}

@Component({
  selector: 'app-text',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css', '../shared/common.css'],
})
export class TextViewComponent implements OnInit {
  text: Text;
  id: string;
  subscription: Subscription;
  showTextSpinner: boolean = true;
  spinnerColor: ThemePalette = 'accent';

  english: Vocab[] = [];
  arabic: Vocab[] = [];

  lastSelectedEnglish: number;
  lastSelectedArabic: number;

  numberOfSelected = 0;

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private titleService: Title,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  selectEnglish(index: number) {
    console.log(index);
    this.lastSelectedEnglish = index;

    var indexInArraryArabic = 0;
    for (let i = 0; i < this.arabic.length; i++) {
      if (this.arabic[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    var indexInArraryEnglish = 0;
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
      this.lastSelectedArabic = null;
      this.lastSelectedEnglish = null;
      this.numberOfSelected = 0;

      var numberOfCorrect = 0;
      for (let index = 0; index < this.english.length; index++) {
        if (this.english[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.english.length) {
        this._snackBar.open('Well Done - MashaAllah! ', '🚀🚀🚀', {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = null;
      this.lastSelectedArabic = null;
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

  selectArabic(index: number) {
    console.log(index);
    this.lastSelectedArabic = index;

    var indexInArraryArabic = 0;
    for (let i = 0; i < this.arabic.length; i++) {
      if (this.arabic[i].id == index) {
        indexInArraryArabic = i;
      }
    }

    var indexInArraryEnglish = 0;
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
      this.lastSelectedArabic = null;
      this.lastSelectedEnglish = null;
      this.numberOfSelected = 0;

      var numberOfCorrect = 0;
      for (let index = 0; index < this.arabic.length; index++) {
        if (this.arabic[index].correct) {
          numberOfCorrect++;
        }
      }
      if (numberOfCorrect == this.arabic.length) {
        this._snackBar.open('Well Done - MashaAllah! ', '🚀🚀🚀', {
          duration: 3000,
        });
      }
    }

    if (this.numberOfSelected == 2) {
      this.numberOfSelected = 0;
      this.lastSelectedEnglish = null;
      this.lastSelectedArabic = null;
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

  openDialog(indexofSentence: number) {
    var words = this.text.sentences.find((i) => i.sentenceId == indexofSentence)
      .words;
    var filteredWords = words.filter((w) => w.english != '');

    this.dialog.open(TextVocabularyComponent, {
      data: filteredWords,
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscription = this.textService.getText(this.id).subscribe(
        (text) => (
          (this.text = text),
          (this.text.sentences = this.text.sentences.sort((n1, n2) => {
            if (n1.order > n2.order) {
              return 1;
            }
            if (n1.order < n2.order) {
              return -1;
            }
            return 0;
          })),
          this.titleService.setTitle(`${text.title} | ${text.author}`),
          this.setSpinneToFalse(),
          this.readWords()
        )
      );
    }
  }
  readWords(): void {
    var numberOfGenerations = 0;
    var randomNumbers = [99];

    for (let index = 0; index < 10; index++) {
      var randomNumber = Math.floor(Math.random() * this.text.sentences.length);
      if (!randomNumbers.includes(randomNumber)) {
        this.GetWordsFromSentences(randomNumber);
        numberOfGenerations = numberOfGenerations + 1;
        randomNumbers.push(randomNumber);
      }
      if (numberOfGenerations == 3) {
        break;
      }
    }

    this.shuffleArray(this.arabic);
    this.shuffleArray(this.english);
  }

  private GetWordsFromSentences(sentenceNumber: number) {
    for (let index = 0; index < this.text.sentences[0].words.length; index++) {
      let english = new Vocab();
      english.word = this.text.sentences[sentenceNumber].words[index].english;
      english.id = this.english.length + 1;

      let arabic = new Vocab();
      arabic.word = this.text.sentences[sentenceNumber].words[index].arabic;
      arabic.id = this.arabic.length + 1;

      if (arabic.word.length > 2 && english.word.length > 2) {
        this.arabic.push(arabic);
        this.english.push(english);
      }
    }
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //TODO: This should not be necessary maybe look if text is null?
  async setSpinneToFalse() {
    await this.delay(300);
    this.showTextSpinner = false;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.text = new Text();
  }
}
