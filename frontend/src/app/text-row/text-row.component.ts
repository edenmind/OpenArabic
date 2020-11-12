import { Component, OnInit, Input } from '@angular/core';
import { Sentence } from '../models/sentence';
import { MatDialog } from '@angular/material/dialog';
import { TextVocabularyComponent } from '../text-vocabulary/text-vocabulary.component';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-row.component.html',
  styleUrls: ['./text-row.component.css', '../shared/common.css'],
})
export class TextRowComponent implements OnInit {
  @Input()
  sentence: Sentence;
  @Input()
  language: string;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(TextVocabularyComponent);
  }

  ngOnInit(): void {}
}
