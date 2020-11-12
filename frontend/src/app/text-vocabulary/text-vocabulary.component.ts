import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-vocabulary',
  templateUrl: './text-vocabulary.component.html',
  styleUrls: ['./text-vocabulary.component.css'],
})
export class TextVocabularyComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<TextVocabularyComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
