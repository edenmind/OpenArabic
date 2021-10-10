import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Word } from '../../models/word';

@Component({
  selector: 'app-text-vocabulary',
  templateUrl: './text-vocabulary.component.html',
  styleUrls: ['./text-vocabulary.component.css'],
})
export class TextVocabularyComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public words: Word[],
    private dialogRef: MatDialogRef<TextVocabularyComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
