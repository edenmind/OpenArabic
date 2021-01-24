import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Word } from '../../models/word';

@Component({
  selector: 'app-text-vocabulary',
  templateUrl: './text-vocabulary.component.html',
  styleUrls: ['./text-vocabulary.component.css'],
})
export class TextVocabularyComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public words: Word[],
    private dialogRef: MatDialogRef<TextVocabularyComponent>
  ) { }

  ngOnInit(): void { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
