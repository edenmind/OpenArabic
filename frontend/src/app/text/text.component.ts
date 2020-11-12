import { Component, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { Text } from '../models/text';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TextVocabularyComponent } from '../text-vocabulary/text-vocabulary.component';
import { Words } from '../models/words';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css', '../shared/common.css'],
})
export class TextComponent implements OnInit {
  text: Text;
  id: string;
  subscription: Subscription;
  showSpinner = true;
  spinnerColor: ThemePalette = 'accent';

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  openDialog(indexofSentence: number) {
    var words = this.text.wordByWord;
    this.dialog.open(TextVocabularyComponent, {
      data: words,
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id: ' + this.id);
    if (this.id) {
      this.subscription = this.textService
        .getText(this.id)
        .subscribe(
          (text) => (
            (this.text = text),
            this.titleService.setTitle(text.title + ' | ' + text.author),
            (this.showSpinner = false)
          )
        );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.text = new Text();
  }
}
