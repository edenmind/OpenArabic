import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { exit } from 'process';
import { Subscription } from 'rxjs';
import { Text } from '../models/text';
import { Word } from '../models/word';
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
    public dialog: MatDialog
  ) {}

  selectEnglish(index: number) {
    index = this.english.find((i) => i.id == index).id;
    if (this.english[index].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.english[index].selected) {
      this.english[index].selected = false;
    } else {
      this.english[index].selected = true;
    }

    if (this.lastSelectedArabic == index) {
      this.english[index].correct = true;
      this.arabic[index].correct = true;
      this.lastSelectedArabic = null;
      this.lastSelectedEnglish = null;
      this.numberOfSelected = 0;
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

    this.lastSelectedEnglish = index;
  }

  selectArabic(index: number) {
    index = this.arabic.find((i) => i.id == index).id;

    if (this.arabic[index].correct) {
      return;
    }

    this.numberOfSelected = this.numberOfSelected + 1;

    if (this.english[index].selected) {
      this.arabic[index].selected = false;
    } else {
      this.arabic[index].selected = true;
    }

    if (this.lastSelectedEnglish == index) {
      this.arabic[index].correct = true;
      this.english[index].correct = true;
      this.lastSelectedArabic = null;
      this.lastSelectedEnglish = null;
      this.numberOfSelected = 0;
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

    this.lastSelectedArabic = index;
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
      this.subscription = this.textService
        .getText(this.id)
        .subscribe(
          (text) => (
            (this.text = text),
            this.titleService.setTitle(text.title + ' | ' + text.author),
            this.setSpinneToFalse(),
            this.readWords()
          )
        );
    }
  }
  readWords(): void {
    for (let index = 0; index < this.text.sentences[0].words.length; index++) {
      let english = new Vocab();
      english.word = this.text.sentences[0].words[index].english;
      english.id = index;

      let arabic = new Vocab();
      arabic.word = this.text.sentences[0].words[index].arabic;
      arabic.id = index;

      this.arabic.push(arabic);
      this.english.push(english);
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
