import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Text } from '../models/text';
import { TextService } from '../services/text.service';
import { TextVocabularyComponent } from '../text-vocabulary/text-vocabulary.component';

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

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  openDialog(indexofSentence: number) {
    var words = this.text.sentences.find((i) => i.sentenceId == indexofSentence)
      .words;
    this.dialog.open(TextVocabularyComponent, {
      data: words,
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
            this.setSpinneToFalse()
          )
        );
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
