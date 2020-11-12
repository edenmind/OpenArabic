import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Words } from '../models/words';

@Component({
  selector: 'app-text-vocabulary',
  templateUrl: './text-vocabulary.component.html',
  styleUrls: ['./text-vocabulary.component.css'],
})
export class TextVocabularyComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public words: Words,
    private dialogRef: MatDialogRef<TextVocabularyComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
