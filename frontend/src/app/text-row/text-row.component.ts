import { Component, OnInit, Input } from '@angular/core';
import { Sentence } from '../models/sentence';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-row.component.html',
  styleUrls: ['./text-row.component.css'],
})
export class TextRowComponent implements OnInit {
  @Input()
  sentence: Sentence;
  @Input()
  language: string;

  constructor() {}

  ngOnInit(): void {}
}
